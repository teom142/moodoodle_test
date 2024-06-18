# music urls.py
from django.urls import path
from .views import MusicCreateView, MusicListView, MusicMappingView ,MusicMoodView, MusicMoodCreateView

app_name ='music'

urlpatterns = [
    path('create/', MusicCreateView.as_view(), name='music'),
    path('list/', MusicListView.as_view(), name='list'),
    path('recomand/<str:id>/<int:diary_id>/', MusicMappingView.as_view(), name='music_mood'),
    path('recomand2/<str:id>/<int:diary_id>/', MusicMoodView.as_view(), name='music_mood'),
    path('mood/', MusicMoodCreateView.as_view()),
]
