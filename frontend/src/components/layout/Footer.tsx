export default function Footer(){
  return (
    <footer className="border-t border-secondary/60 mt-8">
      <div className="container-app py-6 text-xs text-muted flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} MarketStreamX. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white/90">Terms</a>
          <a href="#" className="hover:text-white/90">Privacy</a>
          <a href="https://www.tradingview.com/widget/" target="_blank" className="hover:text-white/90">TradingView Widgets</a>
        </div>
      </div>
    </footer>
  )
}
