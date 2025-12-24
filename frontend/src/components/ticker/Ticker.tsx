import { useEffect, useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useMarketStore } from '@/store/marketStore'

export default function Ticker(){
  const { tickerSymbols, prices, connect, disconnect } = useMarketStore(state => ({
    tickerSymbols: state.tickerSymbols,
    prices: state.prices,
    connect: state.connect,
    disconnect: state.disconnect,
  }), shallow)

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [connect, disconnect])

  const items = useMemo(() => {
    return tickerSymbols.map(sym => {
      const p = prices[sym]
      const chg = p ? ((p.price - p.prevClose) / p.prevClose) * 100 : 0
      const color = chg >= 0 ? 'text-green-400' : 'text-red-400'
      return (
        <div key={sym} className="flex items-center gap-2 px-4">
          <span className="text-xs text-muted">{sym}</span>
          <span className={`text-sm font-medium ${color}`}>{p ? p.price.toFixed(2) : '--'}</span>
          <span className={`text-xs ${color}`}>{p ? chg.toFixed(2) : '0.00'}%</span>
        </div>
      )
    })
  }, [tickerSymbols, prices])

  return (
    <div className="border-t border-secondary/60 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-1 text-white/90">
        {items}
      </div>
      <style>{`
        .animate-marquee { display: inline-block; animation: marquee 30s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  )
}
