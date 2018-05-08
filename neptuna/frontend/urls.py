from django.urls import path
from . import views
urlpatterns = [
    path('',views.accueil),
    path('login', views.connection_page,name='login'),
]