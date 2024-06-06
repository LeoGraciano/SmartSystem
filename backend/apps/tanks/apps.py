from django.apps import AppConfig


class TanksConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.tanks"

    def ready(self) -> None:
        import apps.tanks.signals  # noqa
