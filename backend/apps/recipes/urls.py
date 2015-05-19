from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
from rest_framework.authtoken import views
from views import *

urlpatterns = [
    url('^admin/', include(admin.site.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^get-user-info/', GetUserInfo.as_view(), name='get-user-info'),
    url('^recipes/$', RecipeList.as_view(), name='recipe-list'),
    url('^recipes/(?P<pk>[0-9]+)/$', RecipeDetail.as_view(), name='recipe-detail'),
    url('^add-recipe/$', AddRecipe.as_view(), name='add-recipe'),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
]