"use client"
import { useState } from 'react'
import { setTokens, logout as doLogout, clearTokens } from '../../lib/auth'
import Skeleton from '../../components/Skeleton'

export default function AuthPage(){
  const [phone, setPhone] = useState('')
  const [devOtp, setDevOtp] = useState('')
  const [tokenInfo, setTokenInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)

  async function requestOtp(e: any){
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/v1/auth/request', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({phone_number: phone})})
    const data = await res.json()
    if(data.dev_otp) setDevOtp(data.dev_otp)
    setLoading(false)
  }

  async function verify(e: any){
    e.preventDefault()
    setVerifying(true)
    const code = (document.getElementById('code') as HTMLInputElement).value
    const res = await fetch('/api/v1/auth/verify', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({phone_number: phone, code})})
    const data = await res.json()
    if(data.access_token){
      setTokens(data.access_token, data.refresh_token)
      setTokenInfo(data)
    }
    setVerifying(false)
  }

  async function logout(e: any){
    e.preventDefault()
    await doLogout()
    clearTokens()
    setTokenInfo(null)
  }

  return (
    <div className="space-y-6 container">
      <h2 className="text-2xl font-semibold">Sign in with Phone (OTP)</h2>
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="skeleton-title" />
          <Skeleton className="skeleton-text" />
        </div>
      ) : (
        <form onSubmit={requestOtp} className="flex gap-2">
          <input className="flex-1 px-3 py-2 border rounded" placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          <button className="px-4 py-2 bg-[var(--primary)] text-white rounded">Request OTP</button>
        </form>
      )}
      {devOtp && <p className="text-sm text-slate-600">Dev OTP: <strong>{devOtp}</strong></p>}

      {verifying ? (
        <div className="mt-2">
          <Skeleton className="skeleton-text" />
        </div>
      ) : (
        <form onSubmit={verify} className="flex gap-2">
          <input id="code" className="flex-1 px-3 py-2 border rounded" placeholder="OTP code" />
          <button className="px-4 py-2 bg-[var(--primary)] text-white rounded">Verify</button>
        </form>
      )}

      {tokenInfo && <div className="mt-4 p-4 bg-white border rounded">
        <pre className="text-sm">{JSON.stringify(tokenInfo, null, 2)}</pre>
        <button onClick={logout} className="mt-3 px-3 py-2 bg-red-600 text-white rounded">Logout</button>
      </div>}
    </div>
  )
}

// end
