from rest_framework import serializers

from apps.helpers.mixins import EagerLoadingMixin
from apps.tags.models import UseTag
from apps.tanks.models import FuelSupply, Tank


class TankSerializer(serializers.ModelSerializer, EagerLoadingMixin):
    class Meta:
        model = Tank
        fields = [
            "uuid",
            "name",
            "identify",
            "description",
            "is_active",
            "capacity",
            "reservoir",
            "low_fuel",
        ]
        read_only = [
            "uuid",
            "low_fuel",
        ]


class FuelSupplySerializer(serializers.ModelSerializer, EagerLoadingMixin):
    _PREFETCH_RELATED_FIELDS = [
        "user",
        "tag",
        "tank",
    ]

    class Meta:
        model = FuelSupply
        fields = "__all__"
        read_only = [
            "uuid",
        ]

    used_tag = serializers.CharField()

    def validate_used_tag(self, value):
        tag = UseTag.objects.filter(tag__no_serie=value).first()
        if tag:
            return tag
