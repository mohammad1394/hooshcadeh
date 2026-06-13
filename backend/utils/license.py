from pages.models import SiteSettingsModel


def create_license(courses, name):
    url = 'https://panel.spotplayer.ir/license/edit/'
    site_settings = SiteSettingsModel.objects.first()

    headers = {
        'Content-Type': 'application/json',
        '$API': site_settings.spotplayer_api,
        '$LEVEL': -1,
    }
    body = {
        'course': courses,
        'name': name,
        'watermark': {'text': []},
        'offline':30,
        'device': {
            'p0': 3
        }
    }

    # response = 

    # return response


def update_license(id, courses=None, device=None):
    url = f'https://panel.spotplayer.ir/license/edit/{id}'
    site_settings = SiteSettingsModel.objects.first()

    headers = {
        'Content-Type': 'application/json',
        '$API': site_settings.spotplayer_api,
        '$LEVEL': -1,
    }
    body = {
        'course': courses,
        'name': name,
        'watermark': {'text': []},
        'offline':30,
        'device': {
            'p0': 3
        }
    }
    if courses:
        body['course'] = courses
    
    if device:
        body['device'] = device

    # response = 

    # return response
