import { Link } from 'react-router-dom'

export default function Login(){
  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body space-y-4">
          <div>
            <label className="text-sm text-muted">Email</label>
            <input className="w-full mt-1 bg-secondary/40 rounded px-3 py-2 outline-none focus:ring-2 ring-primary" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm text-muted">Password</label>
            <input type="password" className="w-full mt-1 bg-secondary/40 rounded px-3 py-2 outline-none focus:ring-2 ring-primary" />
          </div>
          <button className="btn btn-primary w-full">Sign in</button>
          <div className="text-xs text-muted">No account? <Link to="/register" className="text-primary">Create one</Link></div>
        </div>
      </div>
    </div>
  )
}
