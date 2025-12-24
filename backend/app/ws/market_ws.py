import asyncio
import json
from typing import List
from fastapi import WebSocket, WebSocketDisconnect
from time import time
import random

SUPPORTED = ["BTCUSDT","ETHUSDT","EURUSD","GBPUSD","SPX","NDX"]
PREV = {
    "BTCUSDT": 65000.0,
    "ETHUSDT": 3200.0,
    "EURUSD": 1.07,
    "GBPUSD": 1.24,
    "SPX": 5200.0,
    "NDX": 18000.0,
}

async def stream_prices(websocket: WebSocket):
    await websocket.accept()
    symbols: List[str] = SUPPORTED.copy()
    try:
        while True:
            try:
                msg = await asyncio.wait_for(websocket.receive_text(), timeout=0.01)
                data = json.loads(msg)
                if data.get("action") == "subscribe":
                    req = [s for s in data.get("symbols", []) if s in SUPPORTED]
                    if req:
                        symbols = req
            except asyncio.TimeoutError:
                pass

            # broadcast mock ticks
            for s in symbols:
                base = PREV[s]
                # random walk around prev
                price = base * (1 + random.uniform(-0.005, 0.005))
                await websocket.send_json({
                    "type": "price",
                    "symbol": s,
                    "price": round(price, 5),
                    "prevClose": base,
                    "ts": int(time()*1000)
                })
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        return
