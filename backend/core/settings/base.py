from .middleware_settings import *  # noqa: ignore=F401 isort:skip
from .installed_apps_settings import *  # noqa: ignore=F401 isort:skip
from .internationalizations_settings import *  # noqa: ignore=F401 isort:skip
from .auth_settings import *  # noqa: ignore=F401 isort:skip
from .host_settings import *  # noqa: ignore=F401 isort:skip
from .media_settings import *  # noqa: ignore=F401 isort:skip
from .email_settings import *  # noqa: ignore=F401 isort:skip
from .database_settings import *  # noqa: ignore=F401 isort:skip
from .reset_framework_settings import *  # noqa: ignore=F401 isort:skip
from .cors_settings import *  # noqa: ignore=F401 isort:skip


from pathlib import Path

from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = config("DEBUG", default=False, cast=bool)

DJANGO_SETTINGS_MODULE = config("DJANGO_SETTINGS_MODULE")

ROOT_URLCONF = "core.urls"

WSGI_APPLICATION = "core.wsgi.application"

ASGI_APPLICATION = "core.asgi.application"

NAME_SYSTEM = "Abastecimento API"

IS_SIGNAL = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
