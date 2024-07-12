from django.urls import path
from .views import BookMappingView
app_name = 'book'

urlpatterns = [
    path('recomand/<str:id>/<int:diary_id>/', BookMappingView.as_view()),
]