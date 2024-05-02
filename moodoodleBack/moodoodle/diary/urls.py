from django.urls import path

from .views import DiaryRegistrationView

app_name = 'diary'

urlpatterns = [
    path('create/', DiaryRegistrationView.as_view())
]