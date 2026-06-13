from django.apps import AppConfig


class UserConfig(AppConfig):
    name = 'user'
    verbose_name = 'کاربران'

    def ready(self):
        from .signals import delete_older_verify_code
