from django.test import TestCase
from apps.recipes.models import Recipe
from django.contrib.auth.models import User

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class TaskTestCase(TestCase):
    def setUp(self):

        test_user = User()
        test_user.id = 1
        # try:
        test_user.username = "username"
        # except Exception, e:
        #     print e
        test_user.username = "failoveruser"

        test_user.first_name = "first name"
        test_user.email = "email@email.email"
        test_user.set_password("testpass")

        test_user.save()

        Recipe.objects.create(name="test recipe",
                              description="test description",
                              directions="test direction",
                              owner=test_user,
                              )


    def test_recipe_creation(self):
        test_recipe = Recipe.objects.get(name="test recipe")
        self.assertEqual(test_recipe.name, "test recipe")