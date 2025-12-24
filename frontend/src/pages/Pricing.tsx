export default function Pricing(){
  const plans = [
    { name: 'Basic', price: '$0', features: ['Delayed data', 'Community support', '2 charts per page'] },
    { name: 'Pro', price: '$29/mo', features: ['Real-time data', 'Priority support', '6 charts per page', 'Advanced watchlists'] },
    { name: 'Institutional', price: 'Contact', features: ['Dedicated feed', 'White-glove support', 'Unlimited charts', 'Custom integrations'] },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(p => (
          <div key={p.name} className="card">
            <div className="card-body space-y-3">
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="text-3xl">{p.price}</div>
              <ul className="text-sm text-muted space-y-1">
                {p.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
              <button className="btn btn-primary w-full">Choose {p.name}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
