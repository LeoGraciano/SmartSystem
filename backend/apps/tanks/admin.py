from django.contrib import admin

from apps.tanks.models import FuelSupply, Tank

# Register your models here.
admin.site.register(Tank)
admin.site.register(FuelSupply)
