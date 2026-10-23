
import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Create an initial superuser."

    def handle(self, *args, **options):
        phone = os.getenv("DJANGO_ADMIN_PHONE")
        password = os.getenv("DJANGO_ADMIN_PASSWORD")

        if not phone or not password:
            raise CommandError(
                "DJANGO_ADMIN_PHONE and DJANGO_ADMIN_PASSWORD are required."
            )

        User = get_user_model()

        if User.objects.filter(
            **{User.USERNAME_FIELD: phone}
        ).exists():
            self.stdout.write("This user already exists. No changes made.")
            return

        User.objects.create_superuser(
            phone_number=phone,
            first_name=os.getenv("DJANGO_ADMIN_FIRST_NAME", "Admin"),
            last_name=os.getenv("DJANGO_ADMIN_LAST_NAME", "User"),
            password=password,
        )

        self.stdout.write(
            self.style.SUCCESS("Superuser created successfully.")
        )
