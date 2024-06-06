from django.urls import include, path
from rest_framework import routers

from apps.accounts.views import UserViewSet
from apps.tags.views import TagViewSet, UseTagViewSet
from apps.tanks.views import FuelSupplyViewSet, TankViewSet

router = routers.DefaultRouter()
router.register("User", UserViewSet)
router.register("Tank", TankViewSet)
router.register("FuelSupply", FuelSupplyViewSet)
router.register("Tag", TagViewSet)
router.register("UseTag", UseTagViewSet)

urlpatterns = [path("", include(router.urls))]
