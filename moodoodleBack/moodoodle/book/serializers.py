from rest_framework import serializers
from .models import Book_Mapping

class BookMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book_Mapping
        fields = ('title', 'author', 'cover', 'description')