from datetime import timedelta
from pathlib import Path
from corsheaders.defaults import default_headers
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "django-insecure-o_uby5^+=f0szq$lxty2kxf@@=p%+q)&!lp9d61e28%m6$!$z9")

DEBUG = os.getenv("DJANGO_DEBUG", "True") == "True"

ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

PUBLIC_MEDIA_BASE_URL = os.getenv("PUBLIC_MEDIA_BASE_URL", "http://localhost:8000")

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'jalali_date',
    'user.apps.UserConfig',
    'course.apps.CourseConfig',
    'pages.apps.PagesConfig',
    'blog.apps.BlogConfig',
    'player',
    'payment',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',
    'django_ckeditor_5',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'player.middleware.SpotPlayerCookieMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("DB_NAME"),
        'USER': os.getenv("DB_USER"),
        'PASSWORD': os.getenv("DB_PASSWORD"),
        'HOST': os.getenv("DB_HOST", "db"),
        'PORT': os.getenv("DB_PORT"),
        'CONN_MAX_AGE': 120,
        'CONN_HEALTH_CHECKS': True
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'fa-ir'
TIME_ZONE = 'Asia/Tehran'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

AUTH_USER_MODEL = 'user.UserModel'
LOGIN_URL = 'user:login'
LOGIN_REDIRECT_URL = 'pages:welcome'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # 'DEFAULT_RENDERER_CLASSES': [
    #     'rest_framework.renderers.JSONRenderer',
    # ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}

# ========== CORS ==========
CORS_ALLOW_CREDENTIALS = True

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000"
).split(",")

CORS_ALLOW_HEADERS = list(default_headers) + [
    'authorization',
]

JAZZMIN_SETTINGS = {
    "site_title": "پنل مدیریت",
    "site_header": "مدیریت سایت",
    "site_brand": " مدیریت ",
    "welcome_sign": "خوش آمدید",
    "copyright": "2026",
    "show_sidebar": True,
    "navigation_expanded": True,
    'custom_css': 'css/admin.css'
}

CKEDITOR_5_CONFIGS = {
    "default": {
        "toolbar": [
            "heading", "alignment", "|",
            "bold", "italic", "underline", "strikethrough", "|",
            "link", "blockquote", "|",
            "bulletedList", "numberedList", "outdent", "indent", "|",
            "imageUpload", "insertTable", "|",
            "undo", "redo",
        ],
        "heading": {
            "options": [
                {"model": "paragraph", "title": "Paragraph"},
                {"model": "heading1", "view": "h1", "title": "Heading 1"},
                {"model": "heading2", "view": "h2", "title": "Heading 2"},
                {"model": "heading3", "view": "h3", "title": "Heading 3"},
                {"model": "heading4", "view": "h4", "title": "Heading 4"},
                {"model": "heading5", "view": "h5", "title": "Heading 5"},
                {"model": "heading6", "view": "h6", "title": "Heading 6"},
            ]
        },
    }
}