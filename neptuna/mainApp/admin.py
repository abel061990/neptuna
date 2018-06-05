from django.contrib import admin
from .models import Project

# Register your models here.

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name','cle','data','analyse','dashboard','connector','model','description','date')
    list_filter = ('name','cle',)
    date_hierarchy = ('date')
    ordering = ('name','date')
    search_fields = ('name','date')


admin.site.register(Project,ProjectAdmin)
