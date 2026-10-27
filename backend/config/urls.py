
from pathlib import Path

from django.contrib import admin
from django.conf import settings
from django.http import FileResponse, Http404
from django.urls import path, include

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)


def serve_course_media(request, filename):
    media_root = Path(settings.MEDIA_ROOT).resolve()
    courses_dir = (media_root / "courses").resolve()
    file_path = (courses_dir / filename).resolve()

    if not file_path.is_relative_to(courses_dir):
        raise Http404

    if not file_path.is_file():
        raise Http404

    file = open(file_path, "rb")

    return FileResponse(
        file,
        content_type="image/webp",
        as_attachment=False,
    )


urlpatterns = [
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    path("admin/", admin.site.urls),
    path("api/auth/", include("user.urls")),
    path("api/course/", include("course.urls")),
    path("api/blog/", include("blog.urls")),
    path("player/", include("player.urls")),
    path("payment/", include("payment.urls")),
    path("api/", include("pages.urls")),
    path("ckeditor5/", include("django_ckeditor_5.urls")),

    path(
        "media/courses/<str:filename>",
        serve_course_media,
        name="course-media",
    ),
]

if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT,
    )
