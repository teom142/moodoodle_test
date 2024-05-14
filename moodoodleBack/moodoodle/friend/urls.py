# friend urls.py
from django.urls import path
from .views import FriendListView, FriendSearchView, FriendAddView, FriendDeleteView, FriendCalendarView

app_name ='friend'

urlpatterns = [
    path('list/', FriendListView.as_view(), name='list'),
    path('search/<str:id>/', FriendSearchView.as_view(), name='search'),
    path('add/<int:to_user_id>/', FriendAddView.as_view(), name='add'),
    path('delete/<int:to_user_id>/', FriendDeleteView.as_view(), name='delete'),
    path('calendar/<int:to_user_id>/', FriendCalendarView.as_view(), name='calendar')
]