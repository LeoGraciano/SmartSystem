from django.db import transaction
from django.db.models.signals import pre_save
from django.dispatch import receiver

from apps.tanks.models import FuelSupply


@transaction.atomic
@receiver(pre_save, sender=FuelSupply)
def user_created(sender, instance, **kwargs):
    instance_old = sender.objects.filter(pk=instance.pk).first()
    if instance_old and instance_old.liters_used != instance.liters_used:
        qty_liters = instance_old.liters_used - instance.liters_used
        tank = instance.tank
        tank.reservoir += qty_liters
        tank.save()

    elif not instance_old:
        tank = instance.tank
        tank.reservoir += -instance.liters_used
        tank.save()
