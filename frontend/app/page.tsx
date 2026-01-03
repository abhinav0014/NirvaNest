import Link from 'next/link'
import ListingCard from '../components/ListingCard'

export default function Home() {
  return (
    <div className="container py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-2 text-slate-900">NirvaNest — Nepal's Marketplace</h1>
        <p className="text-lg text-slate-600 mb-6">A peer-to-peer platform where Nepalis buy and sell locally with secure payments.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link className="p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-lg hover:border-primary-200 transition" href="/listings">
            <h3 className="font-semibold text-lg mb-1">📋 View & Create Listings</h3>
            <p className="text-sm text-slate-600">Browse marketplace items or post your own</p>
          </Link>
          <Link className="p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-lg hover:border-primary-200 transition" href="/auth">
            <h3 className="font-semibold text-lg mb-1">🔐 Sign In with OTP</h3>
            <p className="text-sm text-slate-600">Phone-based authentication (dev: OTP shown)</p>
          </Link>
          <Link className="p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-lg hover:border-primary-200 transition" href="/payments">
            <h3 className="font-semibold text-lg mb-1">💳 Payment</h3>
            <p className="text-sm text-slate-600">Create orders and pay securely</p>
          </Link>
          <Link className="p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-lg hover:border-primary-200 transition" href="/orders">
            <h3 className="font-semibold text-lg mb-1">📦 Order Status</h3>
            <p className="text-sm text-slate-600">Track your orders and payments</p>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ListingCard title="Mountain Bike" price={12000} description="Lightly used, good condition" />
          <ListingCard title="Smartphone" price={25000} description="Latest model, box included" />
          <ListingCard title="Wooden Table" price={3000} description="Solid wood, handcrafted" />
        </div>
      </section>
    </div>
  )
}
