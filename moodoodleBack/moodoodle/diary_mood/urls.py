from django.urls import path

from .views import DiaryMoodCreateView

app_name = 'diary_mood'

urlpatterns = [
    path('<int:pk>', DiaryMoodCreateView.as_view())
]