from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('blog-list/', views.blogList, name='blog-list'),
    path('blog-detail/<str:pk>/', views.blogDetail, name='blog-detail'),
    path('blog-create/', views.blogCreate, name='blog-create'),
    path('blog-update/<str:pk>/', views.blogUpdate, name='blog-update'),
    path('blog-delete/<str:pk>/', views.blogDelete, name='blog-delete'),
]