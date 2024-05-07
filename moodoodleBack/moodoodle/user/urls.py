#user/urls.py
from django.urls import path

from .views import UserRegistrationView, UserLoginView, MypageAPIView, UserLogoutView


app_name = 'user'

urlpatterns = [
    path('signup/', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    path('mypage/', MypageAPIView.as_view())
]
