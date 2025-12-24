import api from './client'
import type { Market, Price, NewsItem, Candle } from '@/types/market'

export async function fetchMarkets(): Promise<Market[]> {
  const { data } = await api.get<Market[]>('/markets')
  return data
}

export async function fetchPrice(symbol: string): Promise<Price> {
  const { data } = await api.get<Price>(`/prices/${symbol}`)
  return data
}

export async function fetchNews(): Promise<NewsItem[]> {
  const { data } = await api.get<NewsItem[]>('/news')
  return data
}

export async function fetchOHLC(symbol: string, tf: string = '60', limit: number = 200): Promise<Candle[]> {
  const { data } = await api.get<Candle[]>(`/prices/${symbol}/ohlc`, { params: { tf, limit } })
  return data
}
