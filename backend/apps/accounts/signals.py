from apps.accounts.models import User
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@transaction.atomic
@receiver(post_save, sender=User)
def user_created(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)
