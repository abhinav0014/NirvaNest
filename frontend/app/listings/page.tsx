"use client"
import { useState } from 'react'
import Skeleton from '../../components/Skeleton'

export default function ListingsPage(){
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [resp, setResp] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  import('../../lib/api').then(({ fetchWithAuth }) => {})

  async function create(e: any){
    e.preventDefault()
    setLoading(true)
    const { fetchWithAuth } = await import('../../lib/api')
    const res = await fetchWithAuth('/api/v1/listings/', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({title, price})})
    const data = await res.json()
    setResp(data)
    setLoading(false)
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Create Listing</h2>
      {loading ? (
        <div className="bg-white p-4 border rounded space-y-2">
          <Skeleton className="skeleton-title" />
          <Skeleton className="skeleton-text" />
          <Skeleton className="skeleton-card" />
        </div>
      ) : (
        <form onSubmit={create} className="space-y-3 bg-white p-4 border rounded">
          <input className="w-full px-3 py-2 border rounded" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input className="w-full px-3 py-2 border rounded" placeholder="Price" type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))} />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[var(--primary)] text-white rounded" type="submit">Create</button>
          </div>
        </form>
      )}
      {resp && <div className="mt-4"><pre>{JSON.stringify(resp, null, 2)}</pre></div>}
    </div>
  )
}
