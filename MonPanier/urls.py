"""MonPanier URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

from MonPanier.api import api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls),
    path('', TemplateView.as_view(template_name="app.html")),
    path('carts', TemplateView.as_view(template_name="app.html")),
    re_path(r'^carts/(?P<id>\d+)$', TemplateView.as_view(template_name="app.html")),
    re_path(r'^carts/(?P<id>\d+)/(?P<product>\d+)$', TemplateView.as_view(template_name="app.html")),
    path('scan', TemplateView.as_view(template_name="app.html")),
    path('search', TemplateView.as_view(template_name="app.html")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
