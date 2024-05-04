# friend urls.py
from django.contrib import admin
from django.urls import path
from .views import FriendListView, FriendSearchView, FriendAddView, FriendDeleteView

urlpatterns = [
    path('list/', FriendListView.as_view(), name='list'),
    path('search/<int:to_user_id>/', FriendSearchView.as_view(), name='search'),
    path('add/<int:to_user_id>/', FriendAddView.as_view(), name='add'),
    path('delete/<int:to_user_id>/', FriendDeleteView.as_view(), name='delete'),
]