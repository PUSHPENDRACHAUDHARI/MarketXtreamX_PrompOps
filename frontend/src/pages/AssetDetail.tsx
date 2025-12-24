import { useParams } from 'react-router-dom'
import TradingViewWidget from '@/components/charts/TradingViewWidget'
import { useEffect, useMemo, useState } from 'react'
import { fetchPrice, fetchOHLC } from '@/api/market'
import type { Price, Candle } from '@/types/market'

const TF = ['1','5','60','240','D']

export default function AssetDetail(){
  const { symbol = 'BTCUSDT' } = useParams()
  const [interval, setInterval] = useState('60')
  const [price, setPrice] = useState<Price | null>(null)
  const [candles, setCandles] = useState<Candle[]>([])

  useEffect(() => { if(symbol) fetchPrice(symbol).then(setPrice).catch(()=>{}) }, [symbol])
  useEffect(() => { if(symbol) fetchOHLC(symbol, interval, 150).then(setCandles).catch(()=> setCandles([])) }, [symbol, interval])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{symbol}</h1>
        <div className="flex gap-2">
          {TF.map(t => (
            <button key={t} className={`btn ${interval===t?'btn-primary':''}`} onClick={()=> setInterval(t)}>{t}</button>
          ))}
        </div>
      </div>

      <TradingViewWidget symbol={symbol!} interval={interval} height={520} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <div className="card-header">OHLC Data</div>
          <div className="card-body overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="text-left p-2">Time</th>
                  <th className="text-right p-2">Open</th>
                  <th className="text-right p-2">High</th>
                  <th className="text-right p-2">Low</th>
                  <th className="text-right p-2">Close</th>
                </tr>
              </thead>
              <tbody>
                {candles.slice(-50).reverse().map((c, i) => (
                  <tr key={i} className="border-t border-secondary/40">
                    <td className="p-2">{new Date(c.ts).toLocaleString()}</td>
                    <td className="p-2 text-right">{c.open.toFixed(5)}</td>
                    <td className="p-2 text-right">{c.high.toFixed(5)}</td>
                    <td className="p-2 text-right">{c.low.toFixed(5)}</td>
                    <td className="p-2 text-right">{c.close.toFixed(5)}</td>
                  </tr>
                ))}
                {candles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-muted">No OHLC data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Market Stats</div>
          <div className="card-body text-sm space-y-2">
            <div className="flex justify-between"><span>Last</span><span>{price ? price.price.toFixed(2) : '—'}</span></div>
            <div className="flex justify-between"><span>Bid</span><span>{price ? price.bid.toFixed(2) : '—'}</span></div>
            <div className="flex justify-between"><span>Ask</span><span>{price ? price.ask.toFixed(2) : '—'}</span></div>
            <div className="flex justify-between"><span>Change</span><span className={price && price.changePct>=0?'text-green-400':'text-red-400'}>{price ? (price.changePct*100).toFixed(2) : '0.00'}%</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
