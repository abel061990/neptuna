from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.models import Session
from django.http import HttpResponse
from .models import Project
import os
import json
import shutil as sh
# Create your views here.
Session.objects.all().delete()

def authentification(request):
    username=request.POST['username']
    password=request.POST['password']
    user=authenticate(request,username=username,password=password)
    if user is not None:
        login(request,user)
        mimetype='application/json'

        return HttpResponse(mimetype)
    else:
        raise('invalid login')

def instantiate_accueil(request):


    nb = Project.objects.count()
    mimetype = 'application/json'
    if nb==0:
        data=json.dumps({'nb':nb})
    else:
        queryset=Project.objects.all()
        result=[]
        idarray=[]
        for i in queryset:
            idarray.append(i.cle)
            result.append({'name':i.name,'id':i.cle,'data':i.data,'analyse':i.analyse,
                                            'dashboard':i.dashboard,'connector':i.connector,
                                            'notebook':i.notebook,'model':i.model,
                                            'description':i.description})

        data={}
        result.reverse()
        idarray.reverse()
        data['proj']=result
        data['idarray']=idarray
        data=json.dumps(data)
    return HttpResponse(data,mimetype)


def create_project(request):

    nom=request.POST['projectname']
    key=request.POST['cle']
    desc=request.POST['desc']
    path=os.path.join(os.path.dirname(os.path.dirname(os.getcwd())),os.path.join('Neptuna-1.0','Projets',nom))
    projet = Project()

    projet.cle=key
    projet.name=nom
    projet.description=desc

    if os.path.isdir(path)==False:

        os.makedirs(os.path.join(path,'datasets'))
        os.makedirs(os.path.join(path, 'analyses'))
        os.makedirs(os.path.join(path, 'connectors'))
        os.makedirs(os.path.join(path, 'dashboard'))
        os.makedirs(os.path.join(path, 'notebook'))
        os.makedirs(os.path.join(path, 'model'))
        projet.save()
    else:
        pass
    """queryset = Project.objects.all()
    result = []
    for i in queryset:
        result.append({'name': i.name, 'id': i.cle, 'data': i.data, 'analyse': i.analyse,
                       'dashboard': i.dashboard, 'connector': i.connector,
                       'notebook': i.notebook, 'model': i.model,
                       'description': i.description})

    data = json.dumps(result)"""
    mimetype = 'application/json'
    return HttpResponse(mimetype)


def delete_project(request):

    key = request.POST['cle']
    nom=request.POST['projectname']

    Project.objects.filter(cle=key).delete()

    path = os.path.join(os.path.dirname(os.path.dirname(os.getcwd())), os.path.join('Neptuna-1.0', 'Projets', nom))

    sh.rmtree(path,ignore_errors=False)
    mimetype = 'application/json'
    return HttpResponse(mimetype)
