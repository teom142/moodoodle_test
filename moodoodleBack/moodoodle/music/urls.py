# music urls.py
from django.urls import path
from .views import MusicCreateView

app_name ='music'

urlpatterns = [
    path('create/', MusicCreateView.as_view(), name='music')
]