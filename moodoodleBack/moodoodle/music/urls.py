# music urls.py
from django.urls import path
from .views import MusicCreateView, MusicListView, MusicMappingView

app_name ='music'

urlpatterns = [
    path('create/', MusicCreateView.as_view(), name='music'),
    path('list/', MusicListView.as_view(), name='list'),
    path('recomand/<str:id>/<int:diary_id>/', MusicMappingView.as_view(), name='music_mood'),
]