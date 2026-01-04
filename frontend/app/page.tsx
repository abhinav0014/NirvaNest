"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ListingCard from '../components/ListingCard';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { Search, TrendingUp, ShieldCheck, Zap, ArrowRight, Tag, Percent } from 'lucide-react';

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
    { id: 1, name: 'Electronics', icon: '📱', color: 'bg-accent-50 text-accent-600' },
    { id: 2, name: 'Vehicles', icon: '🚗', color: 'bg-primary-50 text-primary-600' },
    { id: 3, name: 'Furniture', icon: '🪑', color: 'bg-warning/10 text-warning' },
    { id: 4, name: 'Clothing', icon: '👕', color: 'bg-success/10 text-success' },
    { id: 5, name: 'Books', icon: '📚', color: 'bg-info/10 text-info' },
    { id: 6, name: 'Sports', icon: '⚽', color: 'bg-danger/10 text-danger' },
    { id: 7, name: 'Tools', icon: '🔧', color: 'bg-neutral-100 text-neutral-700' },
    { id: 8, name: 'Gaming', icon: '🎮', color: 'bg-primary-100 text-primary-700' },
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
      {/* Hero Section with Gradient */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent text-white">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Buy and Sell Locally in Nepal
            </h1>
            <p className="text-lg md:text-xl text-primary-50 mb-10">
              A trusted peer-to-peer marketplace where Nepalis connect to buy and sell with secure payments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link  
                href="/browse"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-medium hover:bg-neutral-50 transition-colors shadow-lg"
              >
                Start Browsing
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link  
                href="/sell"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Sell an Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Banners */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Banner 1 */}
            <div className="bg-gradient-to-r from-warning to-warning/80 rounded-xl p-6 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Limited Time</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">Zero Service Fee</h3>
                <p className="text-sm text-white/90">For your first 3 listings this month</p>
              </div>
              <Tag className="w-16 h-16 opacity-20" />
            </div>

            {/* Banner 2 */}
            <div className="bg-gradient-to-r from-success to-success/80 rounded-xl p-6 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Secure</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">Buyer Protection</h3>
                <p className="text-sm text-white/90">Shop with confidence, guaranteed</p>
              </div>
              <ShieldCheck className="w-16 h-16 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Categories */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Browse by Category
          </h2>
          <div className="relative">
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {quickSearches.map(category => (
                <Link
                  key={category.id}
                  href={`/browse?category=${category.name.toLowerCase()}`}
                  className={`flex-shrink-0 px-6 py-4 ${category.color} rounded-xl font-medium text-sm hover:shadow-md transition-all duration-200 flex items-center gap-3 min-w-[140px]`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              Why Choose NirvaNest
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-xl mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">Secure Payments</h3>
                <p className="text-sm text-neutral-600">
                  Integrated with eSewa, Khalti, and ConnectIPS for safe transactions.
                </p>
              </Card>

              <Card className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 text-accent-600 rounded-xl mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">Fast & Easy</h3>
                <p className="text-sm text-neutral-600">
                  List items in minutes and connect with buyers instantly.
                </p>
              </Card>

              <Card className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 text-success rounded-xl mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">Local Focus</h3>
                <p className="text-sm text-neutral-600">
                  Built specifically for Nepal's marketplace community.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/listings">
              <Card hover className="h-full border-primary-200 hover:border-primary-300">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Listings</h3>
                    <p className="text-sm text-neutral-600">Browse or create listings</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/auth">
              <Card hover className="h-full border-accent-200 hover:border-accent-300">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔐</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Sign In</h3>
                    <p className="text-sm text-neutral-600">Phone-based authentication</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/payments">
              <Card hover className="h-full border-success/20 hover:border-success/30">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💳</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Payments</h3>
                    <p className="text-sm text-neutral-600">Secure payment processing</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/orders">
              <Card hover className="h-full border-info/20 hover:border-info/30">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Orders</h3>
                    <p className="text-sm text-neutral-600">Track your transactions</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Featured Listings
            </h2>
            <Link  
              href="/browse"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Nepalis buying and selling on NirvaNest. List your first item today.
          </p>
          <Link  
            href="/sell"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-medium hover:bg-neutral-50 transition-colors shadow-lg"
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