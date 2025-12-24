from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta

router = APIRouter()

class NewsItem(BaseModel):
    id: str
    title: str
    source: str
    url: str
    publishedAt: str

@router.get("/", response_model=list[NewsItem])
async def get_news():
    now = datetime.utcnow()
    return [
        NewsItem(id="1", title="Markets edge higher as risk sentiment improves", source="MSX Desk", url="#", publishedAt=(now - timedelta(minutes=5)).isoformat()+"Z"),
        NewsItem(id="2", title="Bitcoin steady above key support amid consolidation", source="MSX Desk", url="#", publishedAt=(now - timedelta(minutes=20)).isoformat()+"Z"),
        NewsItem(id="3", title="Dollar softens; Euro, Pound firm ahead of data", source="MSX Desk", url="#", publishedAt=(now - timedelta(hours=1)).isoformat()+"Z"),
    ]
