"use client"
import { useState } from 'react'
import { fetchWithAuth } from '../../lib/api'
import Skeleton from '../../components/Skeleton'

export default function PaymentsPage(){
  const [listingId, setListingId] = useState('')
  const [amount, setAmount] = useState(0)
  const [orderResp, setOrderResp] = useState<any>(null)
  const [payResp, setPayResp] = useState<any>(null)
  const [provider, setProvider] = useState('esewa')
  const [loadingOrder, setLoadingOrder] = useState(false)
  const [loadingPay, setLoadingPay] = useState(false)

  async function createOrder(e: any){
    e.preventDefault()
    setLoadingOrder(true)
    const res = await fetchWithAuth('/api/v1/orders', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({listing_id: listingId, amount, currency: 'NPR'})})
    const data = await res.json()
    setOrderResp(data)
    setLoadingOrder(false)
  }

  async function pay(e: any){
    e.preventDefault()
    if(!orderResp || !orderResp.order_id) return
    setLoadingPay(true)
    const res = await fetchWithAuth(`/api/v1/orders/${orderResp.order_id}/pay`, {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ provider })})
    const data = await res.json()
    setPayResp(data)
    setLoadingPay(false)
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Payments (Dev Stub)</h2>
      {loadingOrder ? (
        <div className="space-y-2 bg-white p-4 border rounded">
          <Skeleton className="skeleton-title" />
          <Skeleton className="skeleton-text" />
        </div>
      ) : (
        <form onSubmit={createOrder} className="space-y-3 bg-white p-4 border rounded">
          <input className="w-full px-3 py-2 border rounded" placeholder="Listing ID" value={listingId} onChange={(e)=>setListingId(e.target.value)} />
          <input className="w-full px-3 py-2 border rounded" placeholder="Amount" type="number" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} />
          <button className="px-4 py-2 bg-[var(--primary)] text-white rounded" type="submit">Create Order</button>
        </form>
      )}
      {orderResp && <div className="mt-4 bg-white p-4 border rounded">
        <h3 className="font-medium">Order</h3>
        <pre className="text-sm">{JSON.stringify(orderResp, null, 2)}</pre>
        {loadingPay ? (
          <div className="mt-3">
            <Skeleton className="skeleton-text" />
          </div>
        ) : (
          <form onSubmit={pay} className="mt-3 flex gap-2">
            <input className="px-3 py-2 border rounded" value={provider} onChange={(e)=>setProvider(e.target.value)} />
            <button className="px-4 py-2 bg-[var(--primary)] text-white rounded" type="submit">Pay</button>
          </form>
        )}
      </div>}

      {payResp && <div className="mt-4 bg-white p-4 border rounded">
        <h3 className="font-medium">Payment Response</h3>
        <pre className="text-sm">{JSON.stringify(payResp, null, 2)}</pre>
      </div>}
    </div>
  )
}
