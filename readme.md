# GymGlow Monorepo

**Backend:** FastAPI running in Python 3.11 virtual environment (`packages/backend/venv`), served by Uvicorn.

**Frontend:** React (Vite + TypeScript) app running on Node 18+ via pnpm (`packages/frontend`).

---

## How Keren Runs the App

1. **Open Terminal** and go to the root folder:

```bash
cd GymGlowProject/GymGlow
```

2. **Run both backend and frontend together:**

```bash
pnpm -r --parallel dev
```

- This uses the `dev` scripts in both `packages/backend` and `packages/frontend`.
- Backend will start on [http://localhost:8000](http://localhost:8000)
- Frontend will start on [http://localhost:5173](http://localhost:5173)

3. **Check endpoints:**

- API docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Frontend app: [http://localhost:5173](http://localhost:5173)

---

## First‑time Setup (only once)

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

