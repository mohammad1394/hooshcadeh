# TechnoHoosh - پلتفرم آموزش هوش مصنوعی

آکادمی تکنوهوش - پلتفرم آموزشی دوره‌های هوش مصنوعی

## ساختار پروژه

```
hoshcade/
├── backend/          # Django REST Framework API
├── frontend/         # Next.js Frontend
├── docker-compose.yml
├── .gitlab-ci.yml
└── .env.example
```

## پیش‌نیازها

- Python 3.12+
- Node.js 20+
- PostgreSQL 15+
- Docker & Docker Compose (اختیاری)

## راه‌اندازی سریع (Development)

### با Docker Compose (پیشنهادی)

```bash
# کپی فایل env
cp .env.example .env

# اجرای تمام سرویس‌ها
docker-compose up --build
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs/

### بدون Docker

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows
pip install -r requirements.txt
cp ../.env.example .env     # ویرایش تنظیمات
python manage.py migrate
python manage.py runserver
```

#### Frontend

```bash
cd frontend
npm install
cp ../.env.example .env.local   # ویرایش NEXT_PUBLIC_API_URL
npm run dev
```

## API Documentation

بعد از اجرای بک‌اند:
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/

## تیم توسعه

- بک‌اند: Django REST Framework
- فرانت‌اند: Next.js 16 + TypeScript
