from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import BlogSerializer
from .models import Blog

@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'List': '/blog-list/',
        'Detail View': '/blog-detail/<str:pk>/',
        'Create': '/blog-create',
        'Update': '/blog-update/<str:pk>',
        'Delete': '/blog-delete/<str:pk>'
    }

    return Response(api_urls)

@api_view(['GET'])
def blogList(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def blogDetail(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(blog, many=False)

    return Response(serializer.data)

@api_view(['POST'])
def blogCreate(request):
    serializer = BlogSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def blogUpdate(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(instance=blog, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def blogDelete(request, pk):
    blog = Blog.objects.get(id=pk)
    blog.delete()

    return Response('ITEM HAS BEEN DELETED')
