"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ListingCard from '../components/ListingCard';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { TrendingUp, ShieldCheck, Zap, ArrowRight, Percent } from 'lucide-react';

// Skeleton Card Component
function SkeletonCard() {
  return (
    <Card padding="none">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-6 w-24" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </Card>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);

  const quickSearches = [
    'Electronics', 'Vehicles', 'Furniture', 'Clothing', 'Books', 'Sports', 'Tools', 'Gaming', 'Home & Garden', 'Beauty'
  ];

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setListings([
        {
          id: 1,
          title: "iPhone 12 Pro - Excellent Condition",
          price: 75000,
          description: "Well maintained iPhone with original box and accessories",
          location: "Kathmandu",
          condition: "Like New",
          category: "Electronics",
          postedAt: "2 hours ago"
        },
        {
          id: 2,
          title: "Royal Enfield Classic 350",
          price: 425000,
          description: "Well maintained bike, all papers clear",
          location: "Pokhara",
          condition: "Used",
          category: "Vehicles",
          postedAt: "5 hours ago"
        },
        {
          id: 3,
          title: "Wooden Study Table with Chair",
          price: 8500,
          description: "Solid wood table and chair set",
          location: "Lalitpur",
          condition: "Good",
          category: "Furniture",
          postedAt: "1 day ago"
        },
        {
          id: 4,
          title: "Samsung Galaxy Tab S7",
          price: 55000,
          description: "Barely used tablet with S-Pen and case",
          location: "Kathmandu",
          condition: "Like New",
          category: "Electronics",
          postedAt: "3 hours ago"
        },
        {
          id: 5,
          title: "Mountain Bike - Trek X-Caliber",
          price: 45000,
          description: "Lightly used mountain bike, perfect for trails",
          location: "Bhaktapur",
          condition: "Good",
          category: "Sports",
          postedAt: "6 hours ago"
        },
        {
          id: 6,
          title: "Canon EOS 1500D Camera",
          price: 52000,
          description: "DSLR camera with 18-55mm lens and bag",
          location: "Kathmandu",
          condition: "Like New",
          category: "Electronics",
          postedAt: "4 hours ago"
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Quick Search Categories - Moved to Top */}
      <section className="bg-white border-b border-neutral-200 sticky top-0 z-[5]">
  <div className="w-full overflow-hidden">
    <div className="flex gap-0 overflow-x-auto scrollbar-hide">
      {quickSearches.map((category, index) => (
        <Link
          key={index}
          href={`/browse?category=${category.toLowerCase()}`}
          className="flex-shrink-0 px-6 py-4 text-sm font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 border-b-2 border-transparent hover:border-primary-500 whitespace-nowrap"
        >
          {category}
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* Hero Section - Reduced Height with Full Width Background */}
      <section className="relative w-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 py-16 md:py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Buy and Sell Locally in Nepal
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              A trusted peer-to-peer marketplace connecting Nepalis with secure payments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link  
                href="/browse"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-full font-semibold hover:bg-neutral-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
              >
                Start Browsing
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link  
                href="/sell"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Sell an Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Banners */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Banner 1 */}
            <div className="bg-gradient-to-r from-warning to-warning/90 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">Limited Time</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">Zero Service Fee</h3>
                <p className="text-sm text-white/90">For your first 3 listings this month</p>
              </div>
              <div className="hidden sm:block w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Percent className="w-8 h-8" />
              </div>
            </div>

            {/* Banner 2 */}
            <div className="bg-gradient-to-r from-success to-success/90 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">Secure</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">Buyer Protection</h3>
                <p className="text-sm text-white/90">Shop with confidence, guaranteed</p>
              </div>
              <div className="hidden sm:block w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              Why Choose NirvaNest
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl mb-4">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 mb-3">Secure Payments</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Integrated with eSewa, Khalti, and ConnectIPS for safe and reliable transactions.
                </p>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-100 text-accent-600 rounded-2xl mb-4">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 mb-3">Fast & Easy</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  List items in minutes and connect with buyers instantly across Nepal.
                </p>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-success/10 text-success rounded-2xl mb-4">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 mb-3">Local Focus</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Built specifically for Nepal's marketplace community and culture.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                Featured Listings
              </h2>
              <p className="text-neutral-600">Discover great deals from trusted sellers</p>
            </div>
            <Link  
              href="/browse"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  title={listing.title}
                  price={listing.price}
                  description={listing.description}
                  location={listing.location}
                  condition={listing.condition}
                  category={listing.category}
                  postedAt={listing.postedAt}
                  href={`/listings/${listing.id}`}
                />
              ))
            )}
          </div>

          <div className="text-center sm:hidden">
            <Link  
              href="/browse"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              View All Listings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Nepalis buying and selling on NirvaNest. List your first item today.
          </p>
          <Link  
            href="/sell"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-full font-semibold hover:bg-neutral-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            Post Your First Item
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}