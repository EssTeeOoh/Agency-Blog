from django.conf import settings
from django.core.mail import send_mail
from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    content = CKEditor5Field(config_name="default")
    excerpt = models.TextField(
        max_length=500,
        blank=True,
        help_text="Short summary shown on cards (150–300 chars recommended)",
    )
    featured_image = models.ImageField(
        upload_to="posts/images/", blank=True, null=True
    )
    author = models.CharField(max_length=100, default="Tee")
    categories = models.ManyToManyField(Category, blank=True, related_name="posts")

    # Use auto_now_add for initial creation; allow manual override via updated_at
    publish_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_published = models.BooleanField(
        default=False,
        help_text="Check to publish and notify subscribers",
    )

    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)

    class Meta:
        ordering = ["-publish_date"]
        indexes = [
            # speeds up the published post list query used on every page load
            models.Index(fields=["is_published", "-publish_date"]),
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Snapshot is_published at load time so the signal can detect
        # a true unpublished → published transition, not just any save.
        self._was_published = self.is_published

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        # Update snapshot after save so repeated saves don't re-fire
        self._was_published = self.is_published


class Subscriber(models.Model):
    # blank=True removed — name is required at the serializer level
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-subscribed_at"]

    def __str__(self):
        return f"{self.name} <{self.email}>"


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="replies",
    )

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Comment by {self.name} on {self.post.title}"


class EmailLog(models.Model):
    STATUS_CHOICES = [
        ("sent", "Sent"),
        ("failed", "Failed"),
    ]

    recipient = models.EmailField()
    subject = models.CharField(max_length=255)
    message_body = models.TextField(blank=True)
    html_body = models.TextField(blank=True)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="failed", db_index=True
    )
    error = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_attempt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Email Log"
        verbose_name_plural = "Email Logs"

    def __str__(self):
        return f"[{self.status.upper()}] {self.subject} → {self.recipient}"

    def retry_send(self):
        """Re-send using stored content. Returns (success: bool, message: str)."""
        if self.status == "sent":
            return False, "Email was already sent successfully."

        try:
            send_mail(
                subject=self.subject,
                message=self.message_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[self.recipient],
                html_message=self.html_body or None,
                fail_silently=False,
            )
            self.status = "sent"
            self.error = ""
            self.save(update_fields=["status", "error", "last_attempt"])
            return True, "Email sent successfully on retry!"
        except Exception as exc:
            self.error = str(exc)
            self.save(update_fields=["error", "last_attempt"])
            return False, f"Retry failed: {exc}"