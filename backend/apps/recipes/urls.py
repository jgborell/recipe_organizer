from django.conf.urls import patterns, include, url
from views import RecipeList
urlpatterns = [
    url('^recipes/$', RecipeList.as_view(), name='recipe-list'),
]