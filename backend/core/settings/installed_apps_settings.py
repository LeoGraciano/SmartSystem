BUSINESS_APPS = [
    "apps.accounts",
    "apps.api",
    "apps.tanks",
    "apps.tags",
]

THIRD_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "django_filters",
]

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.humanize",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_APPS + BUSINESS_APPS
