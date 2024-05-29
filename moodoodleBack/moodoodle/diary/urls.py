from django.urls import path

from .views import DiaryCreateView, DiaryUpdateView, DiaryDeleteView, DiaryDetailView, MonthlyCalendarView, YearlyCalendarView

app_name = 'diary'

urlpatterns = [
    path('month/<str:id>/<int:year>/<int:month>/', MonthlyCalendarView.as_view()),
    path('year/<str:id>/<int:year>/', YearlyCalendarView.as_view()),
    path('create/', DiaryCreateView.as_view()),
    path('update/<int:pk>/', DiaryUpdateView.as_view()),
    path('delete/<str:id>/<int:pk>/', DiaryDeleteView.as_view()),
    path('detail/<str:id>/<int:pk>/', DiaryDetailView.as_view())
]