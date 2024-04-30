"""
URL configuration for Event_Calendar_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Event_Calendar_project import views
from django.views.generic import TemplateView
from .views import EventList,EventCreate,EventUpdate,EventDelete

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.loginPage,name="log-in-pg"),
    path('sign-up',views.signupPage,name="sign-up-pg"),
    path('sign-out',views.signOut,name="sign-out"),
    path('home/',views.homePage,name="calendar-home"),
    path('account-settings/',views.settings_page, name="settings-page"),
    path('reset-password/',views.resetPassword,name="resetpass"),
    path('events/',EventList.as_view(), name="all_events"), 
    path('create-event/',EventCreate.as_view(), name="event-create"),
    path('update-event/<int:pk>/',EventUpdate.as_view(), name="event-update"),
    path('delete-event/<int:pk>/',EventDelete.as_view(), name="event-delete"),
]
