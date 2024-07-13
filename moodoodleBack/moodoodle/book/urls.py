from django.urls import path
from .views import BookMappingView, BookCreateView
app_name = 'book'

urlpatterns = [
    path('recomand/<str:id>/<int:diary_id>/', BookMappingView.as_view()),
    path('create/<int:diary_id>/', BookCreateView.as_view(), name='create'),
]