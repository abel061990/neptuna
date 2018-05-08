from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.models import Session
from django.http import HttpResponse

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
