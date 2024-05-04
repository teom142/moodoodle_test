from django.urls import path

from .views import DiaryCreateView, DiaryUpdateView, DiaryDeleteView

app_name = 'diary'

urlpatterns = [
    path('create/', DiaryCreateView.as_view()),
    path('update/<int:pk>/', DiaryUpdateView.as_view()),
    path('delete/<int:pk>/', DiaryDeleteView.as_view())
]