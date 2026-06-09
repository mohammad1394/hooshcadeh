import requests
import re
from django.views import View
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin


@method_decorator(csrf_exempt, name='dispatch')
class SpotPlayerSyncView(View):    
    def post(self, request):
        # دریافت کوکی فعلی
        old_cookie = request.COOKIES.get('X', '')
        
        try:
            # ارسال درخواست به سرور اسپات پلیر
            response = requests.head(
                'https://app.spotplayer.ir/',
                headers={'Cookie': f'X={old_cookie}'} if old_cookie else {},
                timeout=10
            )
            
            # استخراج کوکی جدید
            set_cookie = response.headers.get('set-cookie', '')
            match = re.search(r'X=([a-f0-9]+);', set_cookie)
            
            if match:
                new_cookie = match.group(1)
                
                # ایجاد پاسخ
                django_response = HttpResponse(status=204)
                django_response.set_cookie(
                    'X',
                    new_cookie,
                    max_age=3600 * 24 * 365 * 100,
                    path='/',
                    httponly=False,
                    samesite='Lax'
                )
                
                return django_response
            
            return HttpResponse(status=204)
            
        except requests.RequestException:
            return JsonResponse({'error': 'Sync failed'}, status=500)


class SpotPlayerView(LoginRequiredMixin, View):    
    template_name = 'player/index.html'
    
    def get(self, request: HttpRequest):        
        # دریافت پارامترها از آدرس URL
        # مثال: /player/?key=12345&course=6789&item=101112
        license_key = request.GET.get('key', '')
        course_id = request.GET.get('course', '')
        item_id = request.GET.get('item', '')
        
        # اعتبارسنجی ساده - اگر کلید لایسنس وجود نداشت، خطا نمایش بده
        if not license_key:
            return render(request, self.template_name, {
                'error': 'کلید لایسنس وارد نشده است',
                'has_error': True
            })
        
        # آماده کردن دیتای مورد نیاز برای نمایش در تمپلیت
        context = {
            'license_key': license_key,
            'course_id': course_id,
            'item_id': item_id,
            'cookie_sync_url': '/player/spotx/',  # آدرس همگام‌سازی کوکی
            'cookie_name': 'X',                   # نام کوکی (پیش‌فرض X)
            'side_panel': False,                  # نمایش پنل کناری (false = مخفی)
            'has_error': False,
        }
        
        # رندر کردن صفحه HTML با دیتای ارسالی
        return render(request, self.template_name, context)
