from rest_framework.authtoken.models import Token
from apps.accounts.models import User
from django_filters import rest_framework as filters


class UserFilter(filters.FilterSet):
    token = filters.CharFilter(method="filter_by_token")

    def filter_by_token(self, queryset, name, value):
        try:
            token = Token.objects.get(key=value)
            return queryset.filter(pk=token.user_id)
        except Token.DoesNotExist:
            return queryset.none()

    class Meta:
        model = User
        fields = ["email"]
