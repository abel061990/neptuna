from django.urls import path,re_path
from . import views
urlpatterns = [
    path('',views.accueil),
    path('login', views.connection_page,name='login'),
    re_path(r'^(?P<projet>[\w ]+)/dataset',views.dataset_page),
    path('active/project',views.get_active_project),
    path('data/list',views.get_data_list),
    path('project/upload/file',views.uploadfile),
    path('delete/file',views.deleteUploadedFile),

]