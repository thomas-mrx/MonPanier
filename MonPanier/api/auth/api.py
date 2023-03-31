import os
import re

from django.contrib import messages
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage, send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from ninja import Router
from django.conf import settings
from ninja.security import django_auth
from django.contrib.auth import get_user_model, update_session_auth_hash
from django.contrib.auth.tokens import default_token_generator

from django.contrib.auth.forms import (
    PasswordResetForm,
    SetPasswordForm,
    PasswordChangeForm, UserCreationForm
)

from django.contrib.auth import (
    login as django_login,
    logout as django_logout,
    authenticate
)

from .schema import (
    UserOut,
    LoginIn,
    RegisterIn,
    RequestPasswordResetIn,
    SetPasswordIn,
    ChangePasswordIn,
    ErrorsOut,
)

router = Router()
_LOGIN_BACKEND = 'django.contrib.auth.backends.ModelBackend'



@router.post('/', tags=['auth'], response={200: UserOut, 403: None}, auth=None)
def login(request, data: LoginIn):
    user = authenticate(backend=_LOGIN_BACKEND, **data.dict())
    if user is not None and user.is_active:
        django_login(request, user, backend=_LOGIN_BACKEND)
        return user
    return 403, None


@router.delete('/', tags=['auth'], response={204: None}, auth=django_auth)
def logout(request):
    django_logout(request)
    return 204, None

def validate_email_address(email_address):
   return re.search(r"^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$", email_address)

@router.post('/register', tags=['auth'], response={201: UserOut, 403: None, 400: ErrorsOut, 500: None}, auth=None)
def register(request, data: RegisterIn):
    if request.user.is_authenticated:
        return 403, None
    data = data.dict()
    email = data.pop('email')
    form = UserCreationForm(data)
    if form.is_valid() and validate_email_address(email):
        print("form is valid")
        user = form.save(commit=False)
        user.email = email
        user.is_active = False
        user.save()
        mail_subject = 'Activate your user account.'
        message = render_to_string('emails/register.html', {
            'user': user.username,
            'domain': get_current_site(request).domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': 'test',
            'protocol': 'https' if request.is_secure() else 'http'
        })
        email = EmailMessage(
            mail_subject, message, to=[email]
        )
        email.send()
        return 201, user
    else:
        return 400, {'errors': form.errors}


@router.get('/me', tags=['auth'], response=UserOut, auth=django_auth)
def me(request):
    return request.user


@router.post('/request_password_reset',
             tags=['auth'],
             response={204: None},
             auth=None)
def request_password_reset(request, data: RequestPasswordResetIn):
    form = PasswordResetForm(data.dict())
    if form.is_valid():
        form.save(
            request=request,
            extra_email_context=(
                {'frontend_url': settings.FRONTEND_URL} if
                hasattr(settings, 'FRONTEND_URL') else None
            ),
        )
    return 204, None


@router.post('/reset_password',
             tags=['auth'],
             response={200: UserOut, 403: ErrorsOut, 422: None},
             auth=None)
def reset_password(request, data: SetPasswordIn):
    user_field = get_user_model().USERNAME_FIELD
    user_data = {user_field: getattr(data, user_field)}
    user = get_user_model().objects.filter(**user_data)

    if user.exists():
        user = user.get()
        if default_token_generator.check_token(user, data.token):
            form = SetPasswordForm(user, data.dict())
            if form.is_valid():
                form.save()
                django_login(request, user, backend=_LOGIN_BACKEND)
                return user
            return 403, {'errors': dict(form.errors)}
    return 422, None


@router.post('/change_password',
             tags=['auth'],
             response={200: None, 403: ErrorsOut},
             auth=django_auth)
def change_password(request, data: ChangePasswordIn):
    form = PasswordChangeForm(request.user, data.dict())
    if form.is_valid():
        form.save()
        update_session_auth_hash(request, request.user)
        return 200
    return 403, {'errors': dict(form.errors)}
