export type Market = {
  symbol: string
  name: string
  type: 'crypto' | 'forex' | 'index'
}

export type Price = {
  symbol: string
  price: number
  bid: number
  ask: number
  changePct: number
  prevClose: number
  ts: number
}

export type NewsItem = {
  id: string
  title: string
  source: string
  url: string
  publishedAt: string
}

export type Candle = {
  ts: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}
