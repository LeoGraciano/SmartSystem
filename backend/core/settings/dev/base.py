from django.conf import settings

from core.settings.base import *  # noqa: ignore=F401 isort:skip

APPS_DEV = [
    "django_extensions",
]

settings.INSTALLED_APPS.extend(APPS_DEV)
