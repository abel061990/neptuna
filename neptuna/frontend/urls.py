from django.urls import path,re_path
from . import views
urlpatterns = [
    path('',views.accueil),
    path('login', views.connection_page,name='login'),
    re_path(r'^(?P<projet>[\w ]+)/dataset',views.dataset_page)

]