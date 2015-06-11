from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from serializers import *
from models import Recipe


class RecipeList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        return Recipe.objects.filter(owner=self.request.user)


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class AddRecipe(generics.CreateAPIView):
    serializer_class = RecipeSerializer


class GetUserInfo(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserRegistration(generics.CreateAPIView):
    serializer_class = UserSerializer
