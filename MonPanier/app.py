from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def app(request, id=None, product=None):
    return render(request, 'app.html')