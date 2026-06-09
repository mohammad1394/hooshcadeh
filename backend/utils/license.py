import logging
import requests
from pages.models import SiteSettingsModel

logger = logging.getLogger(__name__)


def create_license(courses, name):
    """
    Create a new license on SpotPlayer.
    
    Args:
        courses: List of course identifiers
        name: License holder's name
        
    Returns:
        Response from SpotPlayer API, or None on failure
    """
    url = 'https://panel.spotplayer.ir/license/edit/'
    site_settings = SiteSettingsModel.objects.first()

    if not site_settings:
        logger.error('Site settings not found, cannot create license')
        return None

    headers = {
        'Content-Type': 'application/json',
        '$API': site_settings.spotplayer_api,
        '$LEVEL': '-1',
    }
    body = {
        'course': courses,
        'name': name,
        'watermark': {'text': []},
        'offline': 30,
        'device': {
            'p0': 3
        }
    }

    try:
        response = requests.post(url, json=body, headers=headers, timeout=15)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error({'error': str(e)}, 'Failed to create license')
        return None


def update_license(license_id, name, courses=None, device=None):
    """
    Update an existing license on SpotPlayer.
    
    Args:
        license_id: The license ID to update
        name: License holder's name
        courses: Optional list of course identifiers
        device: Optional device configuration
        
    Returns:
        Response from SpotPlayer API, or None on failure
    """
    url = f'https://panel.spotplayer.ir/license/edit/{license_id}'
    site_settings = SiteSettingsModel.objects.first()

    if not site_settings:
        logger.error('Site settings not found, cannot update license')
        return None

    headers = {
        'Content-Type': 'application/json',
        '$API': site_settings.spotplayer_api,
        '$LEVEL': '-1',
    }
    body = {
        'name': name,
        'watermark': {'text': []},
        'offline': 30,
        'device': {
            'p0': 3
        }
    }

    if courses:
        body['course'] = courses

    if device:
        body['device'] = device

    try:
        response = requests.put(url, json=body, headers=headers, timeout=15)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error({'error': str(e)}, 'Failed to update license')
        return None
