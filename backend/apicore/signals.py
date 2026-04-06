import logging
import threading
from urllib.parse import quote

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import EmailLog, Post, Subscriber

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────────────────────
# Internal helpers
# ─────────────────────────────────────────────────────────────

def _base_url() -> str:
    return getattr(settings, "SITE_URL", "http://127.0.0.1:3000").rstrip("/")


def _unsubscribe_url(email: str) -> str:
    return f"{_base_url()}/unsubscribe?email={quote(email)}"


def _unsubscribe_footer(url: str) -> str:
    return f"""
<p style="margin-top:48px;padding-top:24px;border-top:1px solid #eee;text-align:center;">
  <a href="{url}"
     style="display:inline-block;padding:8px 20px;font-size:12px;color:#666;
            border:1px solid #ddd;border-radius:4px;text-decoration:none;
            font-family:Arial,sans-serif;">
    Unsubscribe
  </a>
</p>
"""


def _send(subject: str, plain: str, html: str, recipient: str, unsubscribe_url: str | None = None) -> None:
    """
    Send an email via EmailMultiAlternatives (supports List-Unsubscribe header)
    and write a full log entry regardless of outcome.
    """
    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=plain,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient],
        )
        msg.attach_alternative(html, "text/html")

        if unsubscribe_url:
            msg.extra_headers["List-Unsubscribe"] = f"<{unsubscribe_url}>"
            msg.extra_headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click"

        msg.send(fail_silently=False)

        EmailLog.objects.create(
            recipient=recipient,
            subject=subject,
            message_body=plain,
            html_body=html,
            status="sent",
        )
        logger.info("Email sent → %s | %s", recipient, subject)

    except Exception as exc:
        EmailLog.objects.create(
            recipient=recipient,
            subject=subject,
            message_body=plain,
            html_body=html,
            status="failed",
            error=str(exc),
        )
        logger.error("Email failed → %s | %s | %s", recipient, subject, exc)


def _run_in_background(fn, *args) -> None:
    """Fire-and-forget: run fn(*args) in a daemon thread."""
    threading.Thread(target=fn, args=args, daemon=True).start()


# ─────────────────────────────────────────────────────────────
# Welcome email
# ─────────────────────────────────────────────────────────────

def _send_welcome_email(subscriber_id: int) -> None:
    try:
        subscriber = Subscriber.objects.get(pk=subscriber_id)
    except Subscriber.DoesNotExist:
        return

    name = subscriber.name or "there"
    unsub_url = _unsubscribe_url(subscriber.email)
    blog_url = f"{_base_url()}/blog"
    subject = f"Hey {name}, you're in 👋"

    plain = f"""Hey {name},

Thanks for subscribing — really glad you're here.

You'll hear from me when I post something new. Expect sport, tech, life, trends,
and the occasional unhinged opinion.

Browse the blog: {blog_url}

— Tee

To unsubscribe: {unsub_url}
"""

    html = f"""
<div style="font-family:Georgia,serif;max-width:580px;margin:0 auto;padding:32px 16px;color:#222;font-size:16px;line-height:1.8;">
  <p>Hey {name},</p>
  <p>Thanks for subscribing — really glad you're here.</p>
  <p>You'll hear from me when I post something new. Expect sport, tech, life, trends,
  and the occasional unhinged opinion.</p>
  <p>Browse the blog: <a href="{blog_url}" style="color:#1e40af;">{blog_url}</a></p>
  <p>— Tee</p>
  {_unsubscribe_footer(unsub_url)}
</div>
"""
    _send(subject, plain, html, subscriber.email, unsub_url)


# ─────────────────────────────────────────────────────────────
# Admin notification on new subscriber
# ─────────────────────────────────────────────────────────────

def _send_admin_subscriber_notification(subscriber_id: int) -> None:
    try:
        subscriber = Subscriber.objects.get(pk=subscriber_id)
    except Subscriber.DoesNotExist:
        return

    subject = f"New Subscriber: {subscriber.email}"
    plain = f"""New subscription received.

Name:          {subscriber.name}
Email:         {subscriber.email}
Subscribed at: {subscriber.subscribed_at:%Y-%m-%d %H:%M UTC}
"""
    html = f"""
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <h2 style="color:#1e40af;">New Subscriber</h2>
  <p><strong>Name:</strong> {subscriber.name}</p>
  <p><strong>Email:</strong> {subscriber.email}</p>
  <p><strong>Subscribed at:</strong> {subscriber.subscribed_at:%Y-%m-%d %H:%M UTC}</p>
</div>
"""
    admin_email = getattr(settings, "ADMIN_EMAIL", "essteeooh@gmail.com")
    _send(subject, plain, html, admin_email)


# ─────────────────────────────────────────────────────────────
# Post publish notification
# ─────────────────────────────────────────────────────────────

def _send_post_notification(post_id: int) -> None:
    try:
        post = Post.objects.get(pk=post_id, is_published=True)
    except Post.DoesNotExist:
        return

    subscribers = list(Subscriber.objects.filter(is_active=True).only("name", "email"))
    if not subscribers:
        logger.info("No active subscribers — skipping post notification")
        return

    post_url = f"{_base_url()}/blog/{post.slug}"
    subject = post.title

    for subscriber in subscribers:
        name = subscriber.name or "there"
        unsub_url = _unsubscribe_url(subscriber.email)

        plain = f"""Hey {name},

I just published something new — {post.title}.

{post.excerpt}

Read it here: {post_url}

— Tee

To unsubscribe: {unsub_url}
"""
        html = f"""
<div style="font-family:Georgia,serif;max-width:580px;margin:0 auto;padding:32px 16px;color:#222;font-size:16px;line-height:1.8;">
  <p>Hey {name},</p>
  <p>I just published something new.</p>
  <p><strong>{post.title}</strong></p>
  <p>{post.excerpt}</p>
  <p>Read it here: <a href="{post_url}" style="color:#1e40af;">{post_url}</a></p>
  <p>— Tee</p>
  {_unsubscribe_footer(unsub_url)}
</div>
"""
        _send(subject, plain, html, subscriber.email, unsub_url)


# ─────────────────────────────────────────────────────────────
# Signal receivers
# ─────────────────────────────────────────────────────────────

@receiver(post_save, sender=Post)
def on_post_save(sender, instance, created, **kwargs):
    """
    Fire post notification ONLY on the first unpublished -> published transition.
    Editing or re-saving an already-published post does NOT re-notify subscribers.
    """
    was_published = getattr(instance, "_was_published", False)
    just_published = instance.is_published and not was_published

    if just_published:
        post_id = instance.pk
        transaction.on_commit(
            lambda: _run_in_background(_send_post_notification, post_id)
        )
        logger.info("Post published — notifications queued: %s", instance.title)


@receiver(post_save, sender=Subscriber)
def on_subscriber_save(sender, instance, created, **kwargs):
    """Send welcome + admin alert only on brand-new subscribers."""
    if created:
        subscriber_id = instance.pk
        transaction.on_commit(
            lambda: _run_in_background(_send_welcome_email, subscriber_id)
        )
        transaction.on_commit(
            lambda: _run_in_background(_send_admin_subscriber_notification, subscriber_id)
        )