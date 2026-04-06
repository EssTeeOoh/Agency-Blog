from django.contrib import admin, messages
from django.urls import path
from django.utils.html import format_html

from .models import Category, Comment, EmailLog, Post, Subscriber


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "is_published", "publish_date", "updated_at")
    list_filter = ("is_published", "categories")
    search_fields = ("title", "excerpt")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("publish_date", "updated_at")
    filter_horizontal = ("categories",)
    fieldsets = (
        (None, {"fields": ("title", "slug", "author", "categories", "is_published")}),
        ("Content", {"fields": ("excerpt", "content", "featured_image")}),
        ("SEO", {"classes": ("collapse",), "fields": ("meta_title", "meta_description")}),
        ("Timestamps", {"classes": ("collapse",), "fields": ("publish_date", "updated_at")}),
    )


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "is_active", "subscribed_at")
    list_filter = ("is_active",)
    search_fields = ("email", "name")
    readonly_fields = ("subscribed_at",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("name", "post", "is_approved", "created_at")
    list_filter = ("is_approved",)
    search_fields = ("name", "content")
    actions = ["approve_comments"]

    @admin.action(description="Approve selected comments")
    def approve_comments(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f"{updated} comment(s) approved.")


@admin.register(EmailLog)
class EmailLogAdmin(admin.ModelAdmin):
    list_display = ("status_badge", "subject", "recipient", "created_at", "error_preview", "retry_button")
    list_filter = ("status", "created_at")
    search_fields = ("recipient", "subject", "error")
    readonly_fields = ("recipient", "subject", "message_body", "html_body", "status", "error", "created_at", "last_attempt")
    ordering = ("-created_at",)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    @admin.display(description="Status")
    def status_badge(self, obj):
        colour = "#2e7d32" if obj.status == "sent" else "#c62828"
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:3px;font-size:11px;">{}</span>',
            colour,
            obj.status.upper(),
        )

    @admin.display(description="Error")
    def error_preview(self, obj):
        if not obj.error:
            return "—"
        return (obj.error[:80] + "…") if len(obj.error) > 80 else obj.error

    @admin.display(description="Action")
    def retry_button(self, obj):
        if obj.status == "sent":
            return "✓ Sent"
        return format_html(
            '<a href="{}" style="background:#d32f2f;color:#fff;padding:4px 10px;'
            'border-radius:4px;text-decoration:none;font-size:12px;">Retry</a>',
            f"/admin/apicore/emaillog/{obj.pk}/retry/",
        )

    def get_urls(self):
        custom = [
            path(
                "<int:pk>/retry/",
                self.admin_site.admin_view(self._retry_view),
                name="emaillog-retry",
            ),
        ]
        return custom + super().get_urls()

    def _retry_view(self, request, pk):
        try:
            log = EmailLog.objects.get(pk=pk)
        except EmailLog.DoesNotExist:
            self.message_user(request, "Email log not found.", level=messages.ERROR)
            from django.http import HttpResponseRedirect
            return HttpResponseRedirect("../../")

        success, msg = log.retry_send()
        level = messages.SUCCESS if success else messages.ERROR
        self.message_user(request, msg, level=level)

        from django.http import HttpResponseRedirect
        return HttpResponseRedirect("../../")