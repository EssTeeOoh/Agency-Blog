from rest_framework import serializers
from .models import Category, Post, Subscriber


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class PostListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "featured_image",
            "author",
            "publish_date",
            "categories",
        ]


class PostDetailSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    related_posts = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "excerpt",
            "featured_image",
            "author",
            "publish_date",
            "updated_at",
            "categories",
            "meta_title",
            "meta_description",
            "related_posts",
        ]

    def get_related_posts(self, obj):
        """Return up to 3 published posts sharing at least one category."""
        # Only bother querying if the post actually has categories
        if not obj.categories.exists():
            return []

        related = (
            Post.objects.filter(
                is_published=True,
                categories__in=obj.categories.all(),
            )
            .exclude(pk=obj.pk)
            .distinct()
            .order_by("-publish_date")[:3]   # 3 is enough for a "you might like" row
        )
        return PostListSerializer(related, many=True, context=self.context).data


class SubscriberSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        required=True,
        min_length=2,
        max_length=100,
        error_messages={
            "required": "Please enter your name.",
            "min_length": "Name must be at least 2 characters.",
            "blank": "Name cannot be empty.",
        },
    )
    email = serializers.EmailField(
        error_messages={
            "required": "Please enter your email address.",
            "invalid": "Enter a valid email address.",
        }
    )

    class Meta:
        model = Subscriber
        fields = ["name", "email"]

    def validate_email(self, value):
        normalised = value.strip().lower()
        if Subscriber.objects.filter(email__iexact=normalised).exists():
            raise serializers.ValidationError("This email is already subscribed.")
        return normalised

    def validate_name(self, value):
        return value.strip()