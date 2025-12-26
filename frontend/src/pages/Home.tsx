import TradingViewWidget from '@/components/charts/TradingViewWidget'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchNews } from '@/api/market'
import type { NewsItem } from '@/types/market'
import { useMarketStore } from '@/store/marketStore'

const gridSymbols = ['BTCUSDT','ETHUSDT','EURUSD','GBPUSD','SPX','NDX']

export default function Home(){
  const [news, setNews] = useState<NewsItem[]>([])
  const prices = useMarketStore(s => s.prices)

  useEffect(() => {
  fetchNews()
    .then((data) => {
      setNews(Array.isArray(data) ? data : [])
    })
    .catch(() => {
      setNews([])
    })
}, [])


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Market Dashboard</h1>
        <Link to="/markets" className="btn">Explore Markets →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {gridSymbols.map(s => (
          <TradingViewWidget key={s} symbol={s} height={320} />
        ))}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <div className="card-header">Price Cards</div>
          <div className="card-body grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {gridSymbols.map(s => {
              const p = prices[s]
              const change = p ? ((p.price - p.prevClose) / p.prevClose) * 100 : 0
              const color = change >= 0 ? 'text-green-400' : 'text-red-400'
              return (
                <Link key={s} to={`/asset/${s}`} className="bg-secondary/40 rounded p-3 hover:bg-secondary/60 transition">
                  <div className="text-xs text-muted">{s}</div>
                  <div className="text-lg font-semibold">{p ? p.price.toFixed(2) : '—'}</div>
                  <div className={`text-xs ${color}`}>{p ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '0.00%'}</div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="card">
          <div className="card-header">Latest Financial News</div>
          <div className="card-body space-y-3">
            {news.map(n => (
              <a key={n.id} href={n.url} target="_blank" className="block group">
                <div className="text-sm group-hover:text-primary">{n.title}</div>
                <div className="text-xs text-muted">{n.source} · {new Date(n.publishedAt).toLocaleString()}</div>
              </a>
            ))}
            {news.length === 0 && <div className="text-muted">No news available.</div>}
          </div>
        </div>
      </section>
    </div>
  )
}
