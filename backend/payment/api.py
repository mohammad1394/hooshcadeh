import requests
from pages.models import SiteSettingsModel

def create_license(courses, name):
    URL = 'https://panel.spotplayer.ir/license/edit/'
    API = SiteSettingsModel.objects.first().spotplayer_api
    LEVEL = -1
    data = {
        'course': courses,
        'name': name,
        'watermark':{},
        'device': {
            'p0': 3
        }
    }
    headers = {
        'Content-Type': 'application/json',
        '$API': API,
        '$LEVEL': LEVEL
    }
    try:
        response = requests.post(
        url=URL,
        json=data,
        headers=headers,
        )
        return response
    except Exception as e:
        print(e)
        return e
