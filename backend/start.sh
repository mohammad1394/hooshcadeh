
#!/bin/sh
set -e

python manage.py bootstrap_admin

echo "Checking course image..."
ls -l /app/media/courses/digital-marketing-image.webp || true


exec gunicorn config.wsgi:application \
  --bind "0.0.0.0:${PORT:-10000}" \
  --workers 3 \
  --timeout 120 \
  --access-logfile - \
  --error-logfile -
