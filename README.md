# MarketStreamX

MarketStreamX is a professional, responsive financial market web application that displays real-time and delayed financial market data with multiple charts, tickers, and market overview pages.

Tech stack
- Frontend: React + TypeScript (Vite), Tailwind CSS (fintech dark theme), Zustand, Axios, WebSocket, Framer Motion, TradingView Widgets/Library (Widget by default)
- Backend: FastAPI (Python), Redis (cache/pubsub placeholder), PostgreSQL (SQLAlchemy), Celery + Redis (scaffold), WebSocket (FastAPI)

Core Pages
- Market Dashboard (Home)
- Markets Page (tabs: Crypto, Forex, Indices)
- Asset Detail Page
- Authentication UI (Login/Register)
- Subscription / Pricing Page

Backend API
- GET /api/markets
- GET /api/prices/{symbol}
- GET /api/news
- WS /ws/market/{symbol}

Instructions

1) Frontend
- cd frontend
- pnpm i (or npm i / yarn)
- cp .env.example .env
- pnpm dev

2) Backend
- cd backend
- python -m venv .venv && .venv\Scripts\activate (Windows) or source .venv/bin/activate (Unix)
- pip install -r requirements.txt
- cp .env.example .env
- uvicorn app.main:app --reload

TradingView
- This project uses the lightweight TradingView widget embed for convenience and licensing compatibility. If you have access to the Charting Library, you can integrate it under `frontend/src/components/charts/TradingViewAdvanced.tsx`.

Docker
- Not included yet. The codebase is structured to be Docker-ready.

Environment variables
- See frontend/.env.example and backend/.env.example

Structure
- frontend: Vite React TS app
- backend: FastAPI app with routers, models, services, and WS endpoints

Notes
- All market data is mocked initially. Replace services with real integrations when credentials are available.
