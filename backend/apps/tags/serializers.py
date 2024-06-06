from rest_framework import serializers

from apps.helpers.mixins import EagerLoadingMixin
from apps.tags.models import Tag, UseTag


class TagSerializer(serializers.ModelSerializer, EagerLoadingMixin):
    class Meta:
        model = Tag
        fields = "__all__"
        read_only = [
            "uuid",
        ]


class UseTagSerializer(serializers.ModelSerializer, EagerLoadingMixin):
    _PREFETCH_RELATED_FIELDS = [
        "employee",
        "tag",
    ]

    class Meta:
        model = UseTag
        fields = "__all__"
        read_only = [
            "uuid",
        ]
