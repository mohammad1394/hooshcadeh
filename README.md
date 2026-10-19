# TechnoHoosh 🤖

**TechnoHoosh** is an AI education platform designed to make learning artificial intelligence more accessible through a modern and user-friendly web experience.

The project consists of a Next.js frontend and a Django REST Framework backend, with PostgreSQL as the database.

## ✨ Features

- Browse and explore AI educational courses
- User authentication and account management
- Responsive user interface
- Reusable UI components
- Frontend and backend REST API integration
- API documentation with Swagger and ReDoc
- Docker-based development environment

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- React Query

### Backend
- Python 3.12+
- Django
- Django REST Framework
- PostgreSQL

### DevOps & Tools
- Docker
- Docker Compose
- Nginx
- Git
- GitLab CI/CD

## 📁 Project Structure

```text
hooshcadeh/
├── backend/                 # Django REST Framework API
├── frontend/                # Next.js frontend
├── nginx/                   # Nginx configuration
├── .env.example             # Environment variables template
├── .gitignore
├── .gitlab-ci.yml           # GitLab CI/CD configuration
├── docker-compose.yml       # Development environment
├── docker-compose.prod.yml  # Production environment
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 20+
- PostgreSQL 15+
- Docker and Docker Compose

### Option 1: Run with Docker Compose

**1. Clone the repository**

```bash
git clone https://github.com/mohammad1394/hooshcadeh.git
cd hooshcadeh
```

**2. Configure environment variables**

Create a local environment file from the example:

```bash
cp .env.example .env
```

Update the environment variables according to your local setup.

**3. Build and start the services**

```bash
docker-compose up --build
```

**4. Access the application**

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/api/docs/ |
| ReDoc | http://localhost:8000/api/redoc/ |

The available services and ports depend on your Docker Compose configuration.

### Option 2: Run Without Docker

#### Backend Setup

**1. Navigate to the backend directory**

```bash
cd backend
```

**2. Create a virtual environment**

```bash
python -m venv venv
```

**3. Activate the virtual environment**

Windows:

```powershell
venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
source venv/bin/activate
```

**4. Install dependencies**

```bash
pip install -r requirements.txt
```

**5. Configure environment variables**

Configure the backend environment using the root `.env.example` file and the settings required by the Django application.

**6. Apply database migrations**

```bash
python manage.py migrate
```

**7. Start the backend server**

```bash
python manage.py runserver
```

The backend API will be available at http://localhost:8000.

#### Frontend Setup

Open a new terminal.

**1. Navigate to the frontend directory**

```bash
cd frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file and configure the required frontend variables, including `NEXT_PUBLIC_API_URL`, according to the project configuration.

**4. Start the development server**

```bash
npm run dev
```

Open http://localhost:3000 to access the frontend.

## 📚 API Documentation

The backend provides API documentation through Swagger UI and ReDoc.

- **Swagger UI:** http://localhost:8000/api/docs/
- **ReDoc:** http://localhost:8000/api/redoc/

These endpoints are available when the backend is running and the API documentation routes are enabled.

## 🔐 Environment Variables

Use `.env.example` as a reference for configuring the application.

For security reasons:

- Never commit real credentials or database passwords.
- Never expose JWT secrets or other private keys.
- Keep `.env` and `.env.local` files out of version control.
- Use appropriate environment variables for local development and production.

## 🏗️ Architecture

TechnoHoosh uses a separate frontend and backend architecture.

- **Frontend:** Built with Next.js, React, and TypeScript.
- **Backend:** Provides REST API endpoints using Django REST Framework.
- **Database:** PostgreSQL stores application data.
- **Containerization:** Docker Compose coordinates the development services.
- **Reverse Proxy:** Nginx configuration is included in the repository.

## 👥 Development Team

### Frontend Developer

**Mohammad Razaviyan**

[GitHub Profile](https://github.com/mohammad1394)

### Backend Developer

**Abolfazl Khodadosti**

[GitHub Profile](https://github.com/abolfazl0080)

## 📄 License

No license has been specified for this repository. Please contact the repository owner before reusing or distributing the project's code.

---

Built with ❤️ using Next.js, React, TypeScript, and Django REST Framework.