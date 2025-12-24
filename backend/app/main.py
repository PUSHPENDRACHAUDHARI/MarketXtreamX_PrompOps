from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter
from app.routers import markets, prices, news
from app.ws import market_ws
from app.core.settings import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix=settings.api_prefix)
api_router.include_router(markets.router, prefix="/markets", tags=["markets"])
api_router.include_router(prices.router, prefix="/prices", tags=["prices"])
api_router.include_router(news.router, prefix="/news", tags=["news"])
app.include_router(api_router)

# WebSocket routes
app.add_api_websocket_route("/ws/market/stream", market_ws.stream_prices)

@app.get("/")
async def root():
    return {"status": "ok", "name": settings.app_name}
