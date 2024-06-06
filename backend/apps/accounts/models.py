from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from apps.accounts.manager import UserManager
from apps.helpers.models_abstracts import BaseModelField


class User(AbstractBaseUser, PermissionsMixin, BaseModelField):
    email = models.EmailField(_("E-mail"), unique=True)
    name = models.CharField(_("Nome completo"), max_length=150)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(default=timezone.now)
    date_joined = models.DateTimeField(default=timezone.now)
    is_trusty = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def get_short_name(self) -> str:
        return self.name.split(" ")[0]

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        self.full_clean()  # Verifica as restrições extras de cada field
        super().save(*args, **kwargs)

    objects = UserManager()

    class Meta:
        db_table = "tb_user"
        verbose_name = _("User")
        verbose_name_plural = _("Users")
