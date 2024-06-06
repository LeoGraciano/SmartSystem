from django.db import models
from django.core.validators import MinValueValidator
from apps.helpers.models_abstracts import BaseModelField
from django.utils.translation import gettext_lazy as _


class Tank(BaseModelField):
    name = models.CharField(_("Nome"), max_length=32)
    identify = models.CharField(_("Identificação"), max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(_("Está Ativo"), default=True)
    capacity = models.FloatField(_("Capacidade"), validators=[MinValueValidator(0)])
    reservoir = models.FloatField(_("Reservatário"), validators=[MinValueValidator(0)])

    def __str__(self) -> str:
        return f"{self.name}: Lt: {self.reservoir}"

    def low_fuel(self) -> bool:
        return self.reservoir > (self.capacity * 0.2)


class FuelSupply(BaseModelField):
    tank = models.ForeignKey(
        "tanks.tank",
        on_delete=models.CASCADE,
        related_name="fuel_supplies",
        verbose_name="Tanque",
    )

    employee = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="fuel_supplies",
        verbose_name="Funcionário",
        null=True,
    )

    used_tag = models.ForeignKey(
        "tags.UseTag",
        on_delete=models.CASCADE,
        related_name="fuel_supplies",
        null=True,
    )

    liters_used = models.FloatField(
        _("Litros utilizados"), validators=[MinValueValidator(0)]
    )

    km_currency = models.FloatField(
        _("Quilômetro atual"), validators=[MinValueValidator(0)]
    )

    def __str__(self) -> str:
        return f"Tanque: {self.tank.name} | {self.used_tag.tag.name}-{self.used_tag.user.name} \
            | Funcionário: {self.employee.name}"
