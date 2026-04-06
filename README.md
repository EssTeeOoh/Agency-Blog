# Teeooh Solutions

A full-stack web application for a digital agency that builds modern websites. Includes a public-facing marketing site, a blog platform with subscriber notifications, and a Django-powered REST API backend.

> 🔒 Private Repository

---

## Tech Stack

**Frontend**
- Next.js 16.2.1 (Turbopack) + React 19 + TypeScript 5
- Tailwind CSS 4
- Material Tailwind v2 — UI components
- React Slick — carousel
- React Share — social sharing
- AOS + Framer Motion — animations

**Backend**
- Django 6.0.1 + Django REST Framework 3.16
- django-ckeditor-5 — rich text editor
- django-cors-headers — CORS
- python-decouple — environment config
- Pillow — image handling
- Gunicorn — production WSGI server
- SQLite (dev)

---

## Project Structure

```bash
my-landing-project/
├── frontend/                          # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── all/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── ... (hero, content, etc.)
│   │   │   ├── components/
│   │   │   │   ├── Home/              # Hero, AboutUs, Articles, etc.
│   │   │   │   ├── Layout/            # Header, Footer
│   │   │   │   ├── blog/              # Blog-specific components
│   │   │   │   ├── sharebutton/
│   │   │   │   └── Skeleton/
│   │   │   ├── unsubscribe/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── lib/
│   │   │   └── getImageSrc.ts
│   │   └── types/                     # TypeScript definitions
│   ├── public/images/                 # All static images
│   └── .env.local
│
├── backend/                           # Django Backend
│   ├── api/                           # Django project
│   ├── apicore/                       # Main app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── signals.py
│   │   ├── admin.py
│   │   └── throttles.py
│   ├── media/
│   ├── requirements.txt
│   └── .env
│
├── README.md
└── .gitignore


---

## Prerequisites

- Node.js 20+ and npm 10+
- Python 3.11+
- Git

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd my-landing-project
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv

# Windows (Git Bash)
source .venv/Scripts/activate
# macOS / Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (see Environment Variables section below)

# Create logs directory
mkdir logs
touch logs/django.log
# Windows CMD: type nul > logs\django.log

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

API available at: `http://127.0.0.1:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file (see Environment Variables section below)

# Start the development server
npm run dev
```

Frontend available at: `http://localhost:3000`

---

## Environment Variables

### Backend — `backend/.env`

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000
EMAIL_HOST_USER=your-smtp-username
EMAIL_HOST_PASSWORD=your-smtp-password
DEFAULT_FROM_EMAIL=Tee from Teeooh Solutions <you@example.com>
ADMIN_EMAIL=you@example.com
SITE_URL=http://127.0.0.1:3000
```

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## API Endpoints

Base URL: `/api/`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/posts/` | List published posts (`?limit=N` or `?page=N&page_size=N`) | Public |
| `GET` | `/api/posts/<slug>/` | Get single post by slug | Public |
| `POST` | `/api/subscribe/` | Subscribe to newsletter — body: `{ name, email }` | Public |
| `POST` | `/api/unsubscribe/` | Unsubscribe — body: `{ email }` | Public |

---

## Django Admin

Access at `http://127.0.0.1:8000/admin/` with your superuser credentials.

- **Posts** — create, edit, and publish blog posts with CKEditor 5
- **Subscribers** — view and manage newsletter subscribers
- **Email Logs** — view all sent/failed emails with a Retry button for failed sends
- **Comments** — approve or reject reader comments
- **Categories** — manage post categories

---

## Email System

Emails are sent via Brevo SMTP (free tier: 300 emails/day). Three automated emails are configured:

- **Welcome email** — sent to a new subscriber immediately after sign-up
- **Admin notification** — sent to `ADMIN_EMAIL` when a new subscriber signs up
- **Post notification** — sent to all active subscribers when a post is first published

> Post notifications fire only on the first publish. Re-saving an already-published post does **not** re-notify subscribers.

All emails are sent in background threads so the API response is never blocked. Every attempt is logged to the `EmailLog` model and visible in the admin panel.

---

## Building for Production

### Frontend

```bash
cd frontend
rmdir /s /q .next    # Windows — clear build cache
# rm -rf .next       # macOS / Linux / Git Bash
npm run build
npm start
```

### Backend

```bash
cd backend
python manage.py collectstatic
gunicorn api.wsgi:application --bind 0.0.0.0:8000
```

### Production checklist

- [ ] Set `DEBUG=False` in `.env`
- [ ] Set a strong `SECRET_KEY` (never use the default insecure key)
- [ ] Set `ALLOWED_HOSTS` to your actual domain
- [ ] Set `CORS_ALLOWED_ORIGINS` to your frontend URL
- [ ] Set `SITE_URL` to your production frontend URL
- [ ] Consider migrating from SQLite to PostgreSQL

---

## Deployment

**Frontend — [Vercel](https://vercel.com)**
1. Push `frontend/` to a GitHub repository
2. Import the repo on vercel.com
3. Add `NEXT_PUBLIC_API_URL` in **Settings → Environment Variables**
4. Vercel auto-deploys on every push to `main`

**Backend — [Railway](https://railway.app) or [Render](https://render.com)** (both have free tiers)
1. Add all backend `.env` variables in the platform's environment settings
2. Set the start command to `gunicorn api.wsgi:application --bind 0.0.0.0:$PORT`
3. Add `python manage.py migrate` as a release/build command

---

## Known Issues

- **Material Tailwind types** — MT v2/v3 requires `placeholder`, `onPointerEnterCapture`, and `onPointerLeaveCapture` on all components in strict TypeScript mode. A global override in `src/app/types/material-tailwind.d.ts` suppresses these errors project-wide.
- **SQLite database locked** — `settings.py` includes `OPTIONS: { "timeout": 20 }` and emails are sent in background threads to prevent this.
- **Google Fonts during build** — `next build` may fail to fetch Manrope on restricted networks. `layout.tsx` uses an inline `font-family` fallback.
- **Email deliverability** — emails may land in Promotions when sent via third-party SMTP using a Gmail sender address. A custom domain is recommended for production.

---

## License

Private — all rights reserved. Not open for public use or redistribution.
