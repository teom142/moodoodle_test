from rest_framework import serializers

from .models import users

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('id', 'password', 'nickname', 'birthdate')

    def create(self, validated_data):
        user = users.object.create_user(**validated_data)
        return user