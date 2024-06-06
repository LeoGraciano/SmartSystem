from rest_framework import viewsets
from apps.accounts.filters import UserFilter
from apps.accounts.models import User
from apps.accounts.serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter

    def get_permissions(self) -> list[AllowAny | IsAdminUser | IsAuthenticated]:
        if self.action in ["create"]:
            permission_classes = [AllowAny]
        elif self.action in ["destroy"]:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
