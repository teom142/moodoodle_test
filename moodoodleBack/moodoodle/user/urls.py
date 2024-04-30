#user/urls.py
from django.urls import path

from .views import UserRegistrationView


app_name = 'user'

urlpatterns = [
    path('signup/', UserRegistrationView.as_view())
]
