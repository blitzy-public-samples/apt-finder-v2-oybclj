from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

# Human Tasks:
# TODO: Review and possibly customize the admin URL path for security reasons
# TODO: Ensure that all necessary API endpoints are included in the api.urls module
# TODO: Consider adding a path for serving static files in development mode if needed