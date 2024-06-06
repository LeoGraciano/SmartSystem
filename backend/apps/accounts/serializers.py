from rest_framework import serializers

from apps.helpers.mixins import EagerLoadingMixin
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer, EagerLoadingMixin):
    class Meta:
        model = get_user_model()
        fields = [
            "uuid",
            "email",
            "password",
            "name",
        ]
        extra_kwargs = {
            "password": {
                "write_only": True,
                "required": True,
            },
            "uuid": {
                "read_only": True,
            },
        }

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if "password" in validated_data:
            password = validated_data.pop("password")
            instance.set_password(password)
        return super().update(instance, validated_data)
