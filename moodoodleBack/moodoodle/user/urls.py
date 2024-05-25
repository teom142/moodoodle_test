#user/urls.py
from django.urls import path

from .views import UserRegistrationView, UserLoginView, MypageAPIView, UserLogoutView, UserMoodReportView, DuplicatedView, UserSurveyView


app_name = 'user'

urlpatterns = [
    path('signup/', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('duplicated/', DuplicatedView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    path('mypage/<str:id>/', MypageAPIView.as_view()),
    path('mypage/report/<int:year>/<int:month>/', UserMoodReportView.as_view()),
    path('survey/', UserSurveyView.as_view())
]
