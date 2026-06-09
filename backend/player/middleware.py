# player/middleware.py

import re
import time
import requests
from django.utils.deprecation import MiddlewareMixin


class SpotPlayerCookieMiddleware(MiddlewareMixin):
    # نام کوکی (مطابق مستندات اسپات پلیر)
    COOKIE_NAME = 'X'
    
    # آدرس سرور اسپات پلیر برای همگام‌سازی
    SPOT_SERVER_URL = 'https://app.spotplayer.ir/'
    
    # طول عمر کوکی (100 سال به ثانیه)
    COOKIE_MAX_AGE = 3600 * 24 * 365 * 100  # 3,153,600,000 ثانیه
    
    def _is_cookie_valid(self, cookie_value):
        """
        بررسی اعتبار کوکی بر اساس زمان انقضای داخل آن
        معادل: Date.now() < parseInt(X.substr(24, 12), 16)
        
        Args:
            cookie_value: مقدار کوکی X
            
        Returns:
            bool: True اگر کوکی معتبر باشد، False در غیر این صورت
        """
        # بررسی طول کافی برای استخراج زمان
        if len(cookie_value) < 36:
            return False
        
        try:
            # استخراج 12 کاراکتر از موقعیت 24 (زمان انقضا)
            # معادل X.substr(24, 12) در جاوااسکریپت
            expiry_hex = cookie_value[24:36]
            
            # تبدیل از هگزادسیمال به عدد اعشاری
            # معادل parseInt(..., 16)
            expiry_timestamp = int(expiry_hex, 16)
            
            # زمان فعلی به میلی‌ثانیه
            # معادل Date.now()
            current_timestamp = int(time.time() * 1000)
            
            # اگر زمان فعلی از زمان انقضا کمتر باشد، کوکی معتبر است
            return current_timestamp < expiry_timestamp
            
        except (IndexError, ValueError):
            # خطا در پردازش کوکی
            return False
    
    def _sync_cookie_with_server(self, old_cookie_value):
        """
        همگام‌سازی کوکی با سرور اسپات پلیر
        معادل درخواست HEAD به app.spotplayer.ir
        
        Args:
            old_cookie_value: مقدار فعلی کوکی (یا خالی)
            
        Returns:
            str: مقدار جدید کوکی، یا None اگر خطا رخ دهد
        """
        try:
            # ارسال درخواست HEAD به سرور اسپات پلیر
            # معادل https.request({method: 'HEAD', headers: {Cookie: 'X=' + X}})
            response = requests.head(
                self.SPOT_SERVER_URL,
                headers={'Cookie': f'{self.COOKIE_NAME}={old_cookie_value}'} if old_cookie_value else {},
                timeout=10,
                allow_redirects=True
            )
            
            # استخراج کوکی جدید از هدر set-cookie
            # معادل headers['set-cookie'].join('').match(/X=([a-f0-9]+);/)
            set_cookie_header = response.headers.get('set-cookie', '')
            
            if set_cookie_header:
                # جستجوی الگوی X=... در هدر
                match = re.search(r'X=([a-f0-9]+);', set_cookie_header)
                
                if match:
                    return match.group(1)
            
            return None
            
        except requests.RequestException as e:
            # خطا در ارتباط با سرور اسپات پلیر
            print(f"SpotPlayer sync error: {e}")
            return None
    
    def process_request(self, request):
        """
        این متد قبل از رسیدن درخواست به ویو اجرا می‌شود
        معادل middleware اصلی در Express
        
        Args:
            request: شیء درخواست جنگو
            
        Returns:
            None: برای ادامه پردازش درخواست
        """
        # فقط برای درخواست‌هایی که به صفحات پلیر مربوط می‌شوند
        # می‌توانید مسیرهای مورد نیاز را تغییر دهید
        path = request.path
        if not (path.startswith('/player/') or path.startswith('/spotx')):
            return None
        
        # دریافت کوکی X از مرورگر کاربر
        # معادل const X = req.cookies.X;
        x_cookie = request.COOKIES.get(self.COOKIE_NAME, '')
        
        # اگر کوکی وجود دارد و
        if x_cookie and self._is_cookie_valid(x_cookie):
            return None  
        
        # اگر به اینجا رسیدیم، یعنی کوکی منقضی شده یا وجود ندارد
        # نشانه‌گذاری می‌کنیم که نیاز به همگام‌سازی دارد
        request.need_spot_sync = True
        
        return None
    
    def process_response(self, request, response):
        """
        این متد بعد از تولید پاسخ توسط ویو اجرا می‌شود
        برای تنظیم کوکی جدید در پاسخ
        
        Args:
            request: شیء درخواست جنگو
            response: شیء پاسخ جنگو
            
        Returns:
            response: پاسخ با کوکی تنظیم شده
        """
        # اگر نیاز به همگام‌سازی نبود، پاسخ را بدون تغییر برگردان
        if not hasattr(request, 'need_spot_sync'):
            return response
        
        # دریافت کوکی قدیمی (اگر وجود داشته باشد)
        old_cookie = request.COOKIES.get(self.COOKIE_NAME, '')
        
        # همگام‌سازی با سرور اسپات پلیر
        new_cookie = self._sync_cookie_with_server(old_cookie)
        
        # اگر کوکی جدید دریافت شد، آن را در مرورگر کاربر تنظیم کن
        if new_cookie:
            # تنظیم کوکی جدید در مرورگر کاربر
            # معادل res.cookie('X', X, {maxAge: ..., domain: ..., ...})
            response.set_cookie(
                self.COOKIE_NAME,
                new_cookie,
                max_age=self.COOKIE_MAX_AGE,           # 100 سال
                path='/',                               # کوکی برای کل سایت
                domain=None,                            # دامنه فعلی
                secure=False,                           # False برای HTTP (توسعه)
                httponly=False,                         # مهم: باید False باشد
                samesite='Lax'                          # محافظت در برابر CSRF
            )
            
            # افزودن هدر برای دیباگ
            response['X-SpotPlayer-Synced'] = 'true'
            
            # چاپ در لاگ برای دیباگ
            print(f"SpotPlayer: Cookie synced successfully: {new_cookie[:50]}...")
        else:
            print("SpotPlayer: Failed to sync cookie")
        
        return response