import React from 'react'

export default function Footer(){
  const currentYear = new Date().getFullYear()
  return (
    <footer className="mt-auto py-8 border-t border-neutral-200 bg-slate-100">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">NirvaNest</h4>
            <p className="text-sm text-slate-600">Nepal's peer-to-peer marketplace</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li><a href="/listings" className="hover:text-primary-500">Listings</a></li>
              <li><a href="/payments" className="hover:text-primary-500">Payments</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li><a href="#" className="hover:text-primary-500">Privacy</a></li>
              <li><a href="#" className="hover:text-primary-500">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 border-t border-neutral-300 pt-4">
          © {currentYear} NirvaNest — Built for Nepal's marketplace community
        </div>
      </div>
    </footer>
  )
}
