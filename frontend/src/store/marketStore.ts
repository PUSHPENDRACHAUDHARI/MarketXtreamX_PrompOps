import { create } from 'zustand'

export type LivePrice = {
  price: number
  prevClose: number
  ts: number
}

type State = {
  prices: Record<string, LivePrice>
  tickerSymbols: string[]
  ws?: WebSocket
}

type Actions = {
  connect: () => void
  disconnect: () => void
  subscribe: (symbols: string[]) => void
}

const DEFAULT_TICKERS = ['BTCUSDT','ETHUSDT','EURUSD','GBPUSD','SPX','NDX']

export const useMarketStore = create<State & Actions>((set, get) => ({
  prices: {},
  tickerSymbols: DEFAULT_TICKERS,
  connect: () => {
    const { ws } = get()
    if (ws && ws.readyState === WebSocket.OPEN) return
    const proto = window.location.protocol === 'https:' ? 'wss' : 'ws'
    const base = import.meta.env.VITE_WS_BASE || `${proto}://${window.location.host}`
    const socket = new WebSocket(`${base}/ws/market/stream`)

    socket.onopen = () => {
      console.log('WS connected')
      get().subscribe(get().tickerSymbols)
    }
    socket.onclose = () => console.log('WS closed')
    socket.onerror = (e) => console.error('WS error', e)
    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.type === 'price') {
          set(state => ({
            prices: { ...state.prices, [msg.symbol]: { price: msg.price, prevClose: msg.prevClose ?? msg.price, ts: msg.ts } }
          }))
        }
      } catch(err) {
        console.error('WS parse error', err)
      }
    }

    set({ ws: socket })
  },
  disconnect: () => {
    const { ws } = get()
    if (ws) ws.close()
    set({ ws: undefined })
  },
  subscribe: (symbols: string[]) => {
    const { ws } = get()
    if (!ws || ws.readyState !== WebSocket.OPEN) return
    ws.send(JSON.stringify({ action: 'subscribe', symbols }))
  }
}))
