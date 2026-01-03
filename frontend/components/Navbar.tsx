"use client"
import Link from 'next/link'
import React from 'react'
import { HomeIcon, DocumentTextIcon, CreditCardIcon, UserIcon } from '@heroicons/react/24/outline'

export default function Navbar(){
  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200">
      <div className="container flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-xl text-primary-500 flex items-center gap-2 hover:opacity-80 transition">
          <HomeIcon className="w-6 h-6" />
          NirvaNest
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/listings" className="text-sm text-slate-600 hover:text-primary-500 transition flex items-center gap-1">
            <DocumentTextIcon className="w-4 h-4" />
            Listings
          </Link>
          <Link href="/payments" className="text-sm text-slate-600 hover:text-primary-500 transition flex items-center gap-1">
            <CreditCardIcon className="w-4 h-4" />
            Payments
          </Link>
          <Link href="/auth" className="text-sm bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 transition flex items-center gap-1">
            <UserIcon className="w-4 h-4" />
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  )
}
