import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Ticker from '@/components/ticker/Ticker'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  const navItem = (to: string, label: string) => (
    <NavLink
      to={to}
      className={({isActive}) => `px-3 py-2 rounded hover:bg-secondary/60 ${isActive ? 'text-primary' : 'text-white/90'}`}
      onClick={() => setOpen(false)}
    >{label}</NavLink>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/60 bg-background/95 backdrop-blur">
      <div className="container-app flex items-center justify-between h-14">
        <Link to="/" className="font-semibold tracking-wide">MarketStreamX</Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItem('/', 'Dashboard')}
          {navItem('/markets', 'Markets')}
          {navItem('/pricing', 'Pricing')}
          {navItem('/login', 'Login')}
          {navItem('/register', 'Register')}
        </nav>
        <button className="md:hidden btn" onClick={() => setOpen(v=>!v)} aria-label="Toggle Menu">☰</button>
      </div>
      {open && (
        <div className="md:hidden container-app pb-2 flex flex-col gap-1">
          {navItem('/', 'Dashboard')}
          {navItem('/markets', 'Markets')}
          {navItem('/pricing', 'Pricing')}
          {navItem('/login', 'Login')}
          {navItem('/register', 'Register')}
        </div>
      )}
      <Ticker />
    </header>
  )
}
