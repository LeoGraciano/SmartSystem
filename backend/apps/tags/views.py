from rest_framework import viewsets
from apps.tags.models import Tag, UseTag
from apps.tags.serializers import TagSerializer, UseTagSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class UseTagViewSet(viewsets.ModelViewSet):
    queryset = UseTag.objects.all()
    serializer_class = UseTagSerializer
