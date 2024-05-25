# friend urls.py
from django.urls import path
from .views import FriendListView, FriendSearchView, FriendAddView, FriendDeleteView, FriendCalendarView, FriendRequestView, FriendAcceptView, FriendRejectView

app_name ='friend'

urlpatterns = [
    path('list/', FriendListView.as_view(), name='list'),
    path('search/<str:id>/', FriendSearchView.as_view(), name='search'),
    path('add/<int:to_user_id>/', FriendAddView.as_view(), name='add'),
    path('delete/<int:to_user_id>/', FriendDeleteView.as_view(), name='delete'),
    path('calendar/<int:to_user_id>/<int:year>/<int:month>/', FriendCalendarView.as_view(), name='calendar'),
    path('request/', FriendRequestView.as_view(), name='request'),
    path('accept/<int:from_user_id>/', FriendAcceptView.as_view(), name='accept'),
    path('reject/<int:from_user_id>/', FriendRejectView.as_view(), name='reject')
]