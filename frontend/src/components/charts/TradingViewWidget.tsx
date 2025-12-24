import { useEffect, useRef } from 'react'

type Props = {
  symbol: string
  interval?: string
  height?: number
}

export default function TradingViewWidget({ symbol, interval = '60', height = 380 }: Props){
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(!containerRef.current) return
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol,
      interval,
      isTransparent: true,
      width: '100%',
      height,
      colorTheme: 'dark',
      locale: 'en'
    })
    containerRef.current.innerHTML = ''
    containerRef.current.appendChild(script)
  }, [symbol, interval, height])

  return (
    <div className="card tv-container">
      <div className="card-body">
        <div className="tradingview-widget-container" ref={containerRef}></div>
      </div>
    </div>
  )
}
