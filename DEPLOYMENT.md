# Deployment Guide

## 1. Running Locally

### Backend
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### Frontend
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    The website will be available at `http://localhost:5173`.

## 2. Hosting

### Frontend
**Recommended: Vercel**
1.  Push your code to GitHub.
2.  Go to [Vercel](https://vercel.com) and import your repository.
3.  Vercel will automatically detect the Vite project and configure the build settings.
4.  **Important**: You need to set the `VITE_API_URL` environment variable in Vercel to your deployed backend URL (see below).

### Backend
**Constraint**: Your project currently uses **SQLite** (`portfolio.db`). SQLite is a file-based database. Most free cloud hosting platforms (like Render Free Tier, Vercel Serverless) have **ephemeral filesystems**, meaning your database file will be deleted/reset every time the server restarts or deploys.

#### Option A: Render (Easiest Free Option, but Data Resets)
You can host the backend on [Render](https://render.com) for free, but **your data will be lost on every redeploy** unless you upgrade to a paid plan with a persistent disk or switch to PostgreSQL.

1.  Create a new **Web Service** on Render.
2.  Connect your GitHub repository.
3.  Settings:
    *   **Runtime**: Python 3
    *   **Build Command**: `pip install -r backend/requirements.txt`
    *   **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port 10000`
4.  Add Environment Variables:
    *   `SECRET_KEY`: (Generate a random string)
    *   `MAIL_USERNAME`: (Your email for contact form)
    *   `MAIL_PASSWORD`: (Your email app password)

#### Option B: Switch to PostgreSQL (Recommended for Production)
To keep your data persistent on a free tier, you should switch from SQLite to PostgreSQL.
1.  Get a free PostgreSQL database from [Neon](https://neon.tech) or [Render](https://render.com).
2.  Copy the **Connection String** (it looks like `postgres://user:pass@host/dbname`).
3.  Deploy the backend to Render (as above).
4.  Add an Environment Variable named `DATABASE_URL` and paste your connection string as the value.
    *   *Note: The backend automatically handles the `postgres://` vs `postgresql://` difference.*
5.  Your data will now be safe!

#### Option C: VPS (Full Control)
Rent a cheap VPS (e.g., DigitalOcean Droplet, ~$4/mo) and run the backend there. You can keep using SQLite since you have a persistent filesystem.
