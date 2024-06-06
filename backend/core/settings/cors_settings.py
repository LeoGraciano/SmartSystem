from decouple import config, Csv

CORS_ALLOWED_ORIGINS = config("CSRF_TRUSTED_ORIGINS", cast=Csv(), default=[])
