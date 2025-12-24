from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Market(BaseModel):
    symbol: str
    name: str
    type: str  # crypto | forex | index

@router.get("/", response_model=list[Market])
async def get_markets():
    return [
        {"symbol":"BTCUSDT","name":"Bitcoin / Tether","type":"crypto"},
        {"symbol":"ETHUSDT","name":"Ethereum / Tether","type":"crypto"},
        {"symbol":"EURUSD","name":"Euro / US Dollar","type":"forex"},
        {"symbol":"GBPUSD","name":"British Pound / US Dollar","type":"forex"},
        {"symbol":"SPX","name":"S&P 500 Index","type":"index"},
        {"symbol":"NDX","name":"NASDAQ 100 Index","type":"index"},
    ]
