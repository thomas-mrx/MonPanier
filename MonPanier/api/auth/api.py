import re

from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.shortcuts import redirect
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
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


@router.post('/', operation_id="login", tags=['auth'], response={200: UserOut, 403: None}, auth=None)
def login(request, data: LoginIn):
    user = authenticate(backend=_LOGIN_BACKEND, **data.dict())
    if user is not None and user.is_active:
        django_login(request, user, backend=_LOGIN_BACKEND)
        return user
    return 403, None


@router.delete('/', operation_id="logout", tags=['auth'], response={204: None}, auth=django_auth)
def logout(request):
    django_logout(request)
    return 204, None


def validate_email_address(email_address):
    return re.search(r"^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$", email_address)


@router.post('/register', operation_id="register", tags=['auth'],
             response={201: UserOut, 403: None, 400: ErrorsOut, 500: None}, auth=None)
def register(request, data: RegisterIn):
    if request.user.is_authenticated:
        return 403, None
    data = data.dict()
    email = data.pop('email')
    form = UserCreationForm(data)
    if form.is_valid() and validate_email_address(email):
        user = form.save(commit=False)
        user.email = email
        user.is_active = False
        user.save()
        tup_uid = ''.join(urlsafe_base64_encode(force_bytes(user.pk))),
        token = default_token_generator.make_token(user)
        msg = EmailMessage(
            from_email="MonPanier - Transparence alimentaire <{}>".format(settings.EMAIL_FROM),
            to=[email],
        )
        uid = ''
        for item in tup_uid:
            uid = uid + item
        msg.template_id = "d-4142c327a72444d5b82e1aadee805f2f"
        msg.dynamic_template_data = {
            "name": user.username,
            "verify_url": "https://{}/api/auth/activate/{}/{}".format(get_current_site(request).domain, uid, token),
            "main_url": "https://{}".format(get_current_site(request).domain),
        }
        msg.send()
        return 201, user
    else:
        return 400, {'errors': form.errors}


@router.get('/me', operation_id="me", tags=['auth'], response=UserOut, auth=django_auth)
def me(request):
    return request.user


@router.get('/activate/{uid}/{token}', operation_id="activate", tags=['auth'], response={200: None}, auth=None)
def activate(request, uid: str, token: str):
    if request.user and request.user.is_authenticated:
        return redirect('/')
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        django_login(request, user, backend=_LOGIN_BACKEND)
    return redirect('/')


@router.post('/request_password_reset', operation_id="requestPasswordReset",
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


@router.post('/reset_password', operation_id="resetPassword",
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


@router.post('/change_password', operation_id="changePassword",
             tags=['auth'],
             response={200: None, 403: ErrorsOut},
             auth=django_auth)
def change_password(request, data: ChangePasswordIn):
    form = PasswordChangeForm(request.user, data.dict())
    if form.is_valid():
        form.save()
        update_session_auth_hash(request, request.user)
        return 200
    return 403, {'errors': form.errors}
