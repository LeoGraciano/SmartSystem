from django.contrib import admin

from apps.tags.models import Tag, UseTag

# Register your models here.
admin.site.register(Tag)
admin.site.register(UseTag)
