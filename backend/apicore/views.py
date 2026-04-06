import logging

from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Post, Subscriber
from .serializers import PostDetailSerializer, PostListSerializer, SubscriberSerializer
from .throttles import SubscribeRateThrottle

logger = logging.getLogger(__name__)


class PostPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = "page_size"
    max_page_size = 50


class PostListView(generics.ListAPIView):
    """
    GET /api/posts/
    Returns published posts, newest first.

    Query params:
      ?limit=N        — return exactly N posts, no pagination envelope (used by homepage widget)
      ?page=N         — paginated response with count/next/previous/results
      ?page_size=N    — override page size (max 50)
    """

    serializer_class = PostListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return (
            Post.objects.filter(is_published=True)
            .select_related()
            .prefetch_related("categories")
            .order_by("-publish_date")
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        limit = request.query_params.get("limit")
        if limit is not None:
            try:
                limit = max(1, int(limit))
            except (ValueError, TypeError):
                limit = 6
            serializer = self.get_serializer(queryset[:limit], many=True)
            return Response(serializer.data)

        # Full pagination
        self.pagination_class = PostPagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PostDetailView(generics.RetrieveAPIView):
    """GET /api/posts/<slug>/"""

    serializer_class = PostDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        return (
            Post.objects.filter(is_published=True)
            .prefetch_related("categories")
        )


class SubscribeView(APIView):
    """
    POST /api/subscribe/
    Body: { name, email }
    """

    permission_classes = [AllowAny]
    throttle_classes = [SubscribeRateThrottle]

    def post(self, request):
        serializer = SubscriberSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data["email"]
        name = serializer.validated_data["name"]

        # get_or_create is fine here; the serializer already blocks duplicate
        # emails for brand-new subscribers. This branch handles re-subscriptions.
        subscriber, created = Subscriber.objects.get_or_create(
            email=email,
            defaults={"name": name},
        )

        if not created:
            # Existing subscriber — update name and re-activate
            subscriber.name = name
            subscriber.is_active = True
            subscriber.save(update_fields=["name", "is_active"])

        logger.info("Subscriber %s (%s)", email, "created" if created else "reactivated")

        return Response(
            {"message": "Subscribed successfully!", "name": subscriber.name},
            status=status.HTTP_201_CREATED,
        )


class UnsubscribeView(APIView):
    """
    POST /api/unsubscribe/
    Body: { email }
    """

    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email", "").strip().lower()
        if not email:
            return Response(
                {"error": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Deliberately vague — don't reveal whether an email exists
        try:
            subscriber = Subscriber.objects.get(email=email)
            if subscriber.is_active:
                subscriber.is_active = False
                subscriber.save(update_fields=["is_active"])
                logger.info("Unsubscribed %s", email)
        except Subscriber.DoesNotExist:
            pass  # silent — don't leak subscriber list

        return Response(
            {"message": "You have been unsubscribed. Sorry to see you go."},
            status=status.HTTP_200_OK,
        )