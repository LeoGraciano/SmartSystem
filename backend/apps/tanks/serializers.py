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
        fields = [
            "tank",
            "employee",
            "used_tag",
            "liters_used",
            "km_currency",
        ]
        read_only = [
            "uuid",
        ]

    used_tag = serializers.CharField()

    def validate_used_tag(self, value):
        tag = UseTag.objects.filter(tag__no_serie=value).first()
        if tag:
            return tag

    def validate_km_currency(self, value):
        tag = self.validate_used_tag(self.initial_data.get("used_tag"))
        is_valid_km = not UseTag.objects.filter(
            pk=tag.pk, km_currency__gte=value
        ).exists()
        if is_valid_km:
            return value
        raise serializers.ValidationError(
            "Quilometragem atual invalida menor que anterior."
        )

    def validate(self, attrs):
        return super().validate(attrs)
