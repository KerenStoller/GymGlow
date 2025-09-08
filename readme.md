# GymGlow 

### A fitness management platform built with FastAPI (backend) and React (frontend) that enables users to securely register, log in, create personalized workout plans, and track their progress over time. Designed with a responsive interface, GymGlow delivers a smooth, intuitive experience backed by robust authentication and clean client–server integration.
This repository is organized as a monorepo containing both the FastAPI backend and React frontend.

---

## Tech Stack
- **Backend:** FastAPI running in Python 3.11 virtual environment (`packages/backend/venv`), served by Uvicorn.
- **Frontend:** React (Vite + TypeScript) app running on Node 18+ via pnpm (`packages/frontend`).
- **Authentication:** JWT with refresh tokens

---

## Project Structure
# packages/
#   backend/   # FastAPI backend
#   frontend/  # React frontend

---

## Getting Started

1. **Open Terminal** and go to the root folder:

```bash
cd GymGlowProject/GymGlow
```

2. **Run both backend and frontend together:**

```bash
pnpm -r --parallel dev
```
- Backend: [http://localhost:8000](http://localhost:8000)
- Frontend: [http://localhost:5173](http://localhost:5173)

3. **Check endpoints:**

- API docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Frontend app: [http://localhost:5173](http://localhost:5173)

---

## First‑time Setup

### Backend

```bash
cd packages/backend
python3.11 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt  # install all backend dependencies
```

### Frontend

```bash
cd packages/frontend
pnpm install
```

---

## Notes

- `.gitignore` ignores `venv/` and `node_modules/`.
- Always activate the backend venv when installing Python packages, since all Python dependencies for this project are stored there and are currently only used for the backend.
- For frontend dependencies, use `pnpm add <package>` in `packages/frontend`.

