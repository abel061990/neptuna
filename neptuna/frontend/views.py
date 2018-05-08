from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.models import Session
from django.http import HttpResponse

# Create your views here.
def connection_page(request):
    return render(request, 'frontend/connexion.html')
@login_required
def accueil(request):
    return render(request,'frontend/accueil.html')
