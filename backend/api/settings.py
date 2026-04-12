from pathlib import Path
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent

# ─────────────────────────────────────────────
# Core
# ─────────────────────────────────────────────
SECRET_KEY = config("SECRET_KEY")
DEBUG = config("DEBUG", default=False, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="127.0.0.1,localhost", cast=Csv())

# ─────────────────────────────────────────────
# Apps & Middleware
# ─────────────────────────────────────────────
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "django_ckeditor_5",
    "rest_framework",
    "apicore.apps.ApicoreConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ─────────────────────────────────────────────
# CORS
# ─────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    default="http://localhost:3000",
    cast=Csv(),
)
# Never use CORS_ALLOW_ALL_ORIGINS = True in production
CORS_ALLOW_ALL_ORIGINS = DEBUG  # True only in local dev

# ─────────────────────────────────────────────
# URLs / WSGI
# ─────────────────────────────────────────────
ROOT_URLCONF = "api.urls"
WSGI_APPLICATION = "api.wsgi.application"

# ─────────────────────────────────────────────
# Templates
# ─────────────────────────────────────────────
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ─────────────────────────────────────────────
# Database
# ─────────────────────────────────────────────
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        # Prevent "database is locked" on concurrent writes
        "OPTIONS": {"timeout": 20},
    }
}

# ─────────────────────────────────────────────
# Password validation
# ─────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ─────────────────────────────────────────────
# Internationalisation
# ─────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ─────────────────────────────────────────────
# Static & Media
# ─────────────────────────────────────────────
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"   # needed for collectstatic in production
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ─────────────────────────────────────────────
# Django REST Framework
# ─────────────────────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "60/min",       # global anon rate limit
        "subscribe": "4/hour",  # tighter limit on subscribe endpoint
    },
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}

# ─────────────────────────────────────────────
# CKEditor 5
# ─────────────────────────────────────────────
CKEDITOR_5_CONFIGS = {
    "default": {
        "toolbar": [
            "heading", "|", "bold", "italic", "link",
            "bulletedList", "numberedList", "blockQuote",
            "imageUpload", "|", "undo", "redo",
        ],
        "image": {
            "toolbar": ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
        },
        "height": 500,
        "width": "100%",
    },
}
CKEDITOR_UPLOAD_PATH = "uploads/"

# ─────────────────────────────────────────────
# Email (Brevo SMTP)
# ─────────────────────────────────────────────
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp-relay.brevo.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")
SERVER_EMAIL = DEFAULT_FROM_EMAIL

# App-specific
ADMIN_EMAIL = config("ADMIN_EMAIL")
SITE_URL = config("SITE_URL")

# ─────────────────────────────────────────────
# Logging — console only (Render captures all stdout)
# ─────────────────────────────────────────────
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "loggers": {
        "apicore": {
            "handlers": ["console"],
            "level": "DEBUG" if DEBUG else "INFO",
            "propagate": False,
        },
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"