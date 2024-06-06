from django.db import models
from django.core.validators import MinValueValidator
from apps.helpers.models_abstracts import BaseModelField
from django.utils.translation import gettext_lazy as _


class Tag(BaseModelField):
    name = models.CharField(_("Nome"), max_length=50)
    no_serie = models.CharField(_("N° Serie"), max_length=50)
    is_active = models.BooleanField(_("Está Ativo"), default=True)
    km_initial = models.FloatField(
        _("Quilômetro inicial"), validators=[MinValueValidator(0)]
    )
    km_currency = models.FloatField(
        _("Quilômetro atual"), validators=[MinValueValidator(0)]
    )

    def __str__(self) -> str:
        active = "Sim" if self.is_active else "Não"
        return f"TAG: {self.name} | Ativo: {active}"


class UseTag(BaseModelField):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="used_tags",
        verbose_name="Usuário",
        null=True,
    )

    tag = models.ForeignKey(
        "tags.Tag", on_delete=models.CASCADE, related_name="used_tags", null=True
    )

    is_active = models.BooleanField(_("Está ativa"), default=True)

    km_initial = models.FloatField(
        _("Quilômetro inicial"), validators=[MinValueValidator(0)], default=0
    )
    km_currency = models.FloatField(
        _("Quilômetro atual"), validators=[MinValueValidator(0)], default=0
    )

    def __str__(self) -> str:
        active = "Sim" if self.is_active else "Não"
        return f"TAG: {self.tag.name} | Usuário: {self.user.name} | Ativo: {active}"
