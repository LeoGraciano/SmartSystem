from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from apps.tanks.models import FuelSupply, Tank
from apps.tanks.serializers import FuelSupplySerializer, TankSerializer


class TankViewSet(viewsets.ModelViewSet):
    queryset = Tank.objects.all()
    serializer_class = TankSerializer

    def get_permissions(self) -> list[IsAdminUser | IsAuthenticated]:
        if self.action in ["list", "retrieve"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class FuelSupplyViewSet(viewsets.ModelViewSet):
    queryset = FuelSupply.objects.all()
    serializer_class = FuelSupplySerializer
