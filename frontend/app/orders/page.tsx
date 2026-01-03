"use client"
import { useState } from 'react'
import { fetchWithAuth } from '../../lib/api'

export default function OrdersPage(){
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function load(e: any){
    e.preventDefault()
    setError(null)
    try{
      const res = await fetchWithAuth(`/api/v1/orders/${orderId}`, {method: 'GET'})
      const data = await res.json()
      if(!res.ok) {
        setError(data.detail || 'failed')
        setOrder(null)
        return
      }
      setOrder(data)
    } catch(err){
      setError('network error')
      setOrder(null)
    }
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Order Status</h2>
      <form onSubmit={load} className="flex gap-2">
        <input className="flex-1 px-3 py-2 border rounded" placeholder="order id" value={orderId} onChange={(e)=>setOrderId(e.target.value)} />
        <button className="px-4 py-2 bg-[var(--primary)] text-white rounded" type="submit">Load</button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {order && <div className="mt-4 bg-white p-4 border rounded"><pre className="text-sm">{JSON.stringify(order, null, 2)}</pre></div>}
    </div>
  )
}
