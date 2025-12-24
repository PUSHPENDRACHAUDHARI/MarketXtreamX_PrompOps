import { useState } from 'react'
import TradingViewWidget from '@/components/charts/TradingViewWidget'

const TABS = [
  { key: 'crypto', label: 'Crypto', symbols: ['BTCUSDT','ETHUSDT'] },
  { key: 'forex', label: 'Forex', symbols: ['EURUSD','GBPUSD'] },
  { key: 'indices', label: 'Indices', symbols: ['SPX','NDX'] },
]

export default function Markets(){
  const [tab, setTab] = useState('crypto')

  const active = TABS.find(t => t.key === tab)!

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Markets</h1>

      <div className="flex gap-2">
        {TABS.map(t => (
          <button key={t.key} className={`btn ${tab===t.key?'btn-primary':''}`} onClick={()=> setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {active.symbols.map(s => (
          <div key={s}>
            <TradingViewWidget symbol={s} height={340} />
            <div className="text-right mt-2">
              <button className="btn">Full Screen</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
