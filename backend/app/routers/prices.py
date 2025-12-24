from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from time import time
from typing import List
from datetime import datetime, timedelta
import math

router = APIRouter()

class Price(BaseModel):
    symbol: str
    price: float
    bid: float
    ask: float
    changePct: float
    prevClose: float
    ts: int

class Candle(BaseModel):
    ts: int  # epoch ms
    open: float
    high: float
    low: float
    close: float
    volume: float

MOCK_PREV = {
    "BTCUSDT": 65000.0,
    "ETHUSDT": 3200.0,
    "EURUSD": 1.07,
    "GBPUSD": 1.24,
    "SPX": 5200.0,
    "NDX": 18000.0,
}

@router.get("/{symbol}", response_model=Price)
async def get_price(symbol: str):
    if symbol not in MOCK_PREV:
        raise HTTPException(404, detail="Unsupported symbol")
    prev = MOCK_PREV[symbol]
    last = prev * 1.001  # mock: +0.1%
    return Price(
        symbol=symbol,
        price=last,
        bid=last - 0.1,
        ask=last + 0.1,
        changePct=(last - prev) / prev,
        prevClose=prev,
        ts=int(time()*1000)
    )

@router.get("/{symbol}/ohlc", response_model=List[Candle])
async def get_ohlc(
    symbol: str,
    tf: str = Query("60", description="Timeframe: minutes (e.g. '1','5','60','240') or 'D'"),
    limit: int = Query(200, ge=1, le=2000)
):
    if symbol not in MOCK_PREV:
        raise HTTPException(404, detail="Unsupported symbol")

    # Determine bar duration
    if tf.upper() == 'D':
        delta = timedelta(days=1)
    else:
        try:
            minutes = int(tf)
        except ValueError:
            raise HTTPException(400, detail="Invalid timeframe")
        delta = timedelta(minutes=minutes)

    # Generate deterministic mock candles around a base using a sine wave + noise
    base_price = MOCK_PREV[symbol]
    now = datetime.utcnow()
    candles: List[Candle] = []
    cur = now - delta * limit
    prev_close = base_price

    for i in range(limit):
        # Sine-driven drift and small random-ish variance (deterministic from index)
        drift = math.sin(i / 10) * 0.005  # +/-0.5%
        open_px = prev_close
        close_px = open_px * (1 + drift)
        high_px = max(open_px, close_px) * (1 + 0.001)
        low_px = min(open_px, close_px) * (1 - 0.001)
        vol = 1000 + (i % 50) * 10

        candles.append(Candle(
            ts=int(cur.timestamp() * 1000),
            open=round(open_px, 6),
            high=round(high_px, 6),
            low=round(low_px, 6),
            close=round(close_px, 6),
            volume=float(vol)
        ))
        prev_close = close_px
        cur += delta

    return candles
