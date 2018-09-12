from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.models import Session
from django.http import HttpResponse
import json
import os
import sys
import pandas as pd
sys.path.insert(0,os.path.join(os.getcwd(),'mainApp'))
from mainApp.models import Project
from connectors.scripts.localFiles.readFile import read_file
import gc
#import subprocess
#p1=subprocess.Popen(["redis-server"], stdout=subprocess.PIPE)

file_uploaded={}

# Create your views here.
def connection_page(request):
    return render(request, 'frontend/connexion.html')
@login_required
def accueil(request):
    return render(request,'frontend/accueil.html')
@login_required
def dataset_page(request,projet):


    p=Project.objects.filter(pk=projet)
    for i in p:
        request.session['active_project']=i.name


    path = os.path.join(os.path.dirname(os.path.dirname(os.getcwd())),
                        os.path.join('Neptuna-1.0', 'Projets', request.session['active_project'], 'datasets'))
    if len(os.listdir(path))>0:

        return render(request,'frontend/dataset.html')

    else:
        return render(request,'frontend/uploadfile.html')

def get_active_project(request):
    proj=request.session['active_project']

    data=json.dumps({'activeProject':proj})
    file_uploaded.clear()
    mimetype = 'application/json'
    return HttpResponse(data,mimetype)

def get_data_list(request):

    proj = request.session['active_project']
    path = os.path.join(os.path.dirname(os.path.dirname(os.getcwd())),
                        os.path.join('Neptuna-1.0', 'Projets', proj,'datasets'))

    datalist=os.listdir(path)

    res={}

    data = json.dumps(res)

    mimetype = 'application/json'
    return HttpResponse(data, mimetype)

def uploadfile(request):


    key=list(request.FILES.keys())


    if len(key)>0:
        file_uploaded[key[0]]=request.FILES[key[0]]


    if len(file_uploaded.keys())==1:

        df_temp=read_file(key[0],file_uploaded[key[0]])
        col=df_temp.dtypes.to_dict()
        gc.collect()
        df_temp=df_temp.iloc[0:100,:]
        col=list(df_temp.columns)
        df_temp1=df_temp.copy()
        df_temp1.columns=[c+'_'+str(1) for c in col]
        df_temp2 = df_temp.copy()
        df_temp2.columns = [c + '_' + str(2) for c in col]
        df_temp3 = df_temp.copy()
        df_temp3.columns = [c + '_' + str(3) for c in col]
        df_temp4 = df_temp.copy()
        df_temp4.columns = [c + '_' + str(4) for c in col]
        #print(col)
        df_temp=pd.concat([df_temp,df_temp1,df_temp2,df_temp3,df_temp4],axis=1,ignore_index=False)
        #print(df_temp.head())
        col=list(df_temp.columns)
        gc.collect()

        df_temp=df_temp.to_dict(orient='record')

    else:
        df_temp= {}
        col={}

    print(df_temp[0])


    """if 'file_uploaded' in request.session.keys():
        request.session['file_uploaded'][key[0]]=1

    else:
        request.session['file_uploaded']=json.dumps(ph)"""

    """print(request.session['file_uploaded'][key[0]])"""

    #sz=request.FILES[key[0]].size




    """for chunk in pd.read_csv(ph,chunksize=200000):

        c=c+1
        print('shape',chunk.shape)

    print(c)"""


    mimetype = 'application/json'
    data={}
    data['table']=df_temp
    data['col']=col
    data=json.dumps(data)
    return HttpResponse(data, mimetype)

def deleteUploadedFile(request):

    file=request.POST['filename']
    file_uploaded.pop(file)


    mimetype = 'application/json'
    data = {}
    json.dumps(data)
    return HttpResponse(data, mimetype)