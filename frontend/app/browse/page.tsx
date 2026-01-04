"use client"
import { useState, useEffect } from 'react';
import ListingCard from '../../components/ListingCard';
import Card from '../../components/Card';
import Skeleton from '../../components/Skeleton';
import { Search, SlidersHorizontal } from 'lucide-react';

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

export default function BrowsePage() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'vehicles', name: 'Vehicles' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'sports', name: 'Sports' },
    { id: 'books', name: 'Books' },
    { id: 'other', name: 'Other' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setListings([
        {
          id: 1,
          title: "iPhone 12 Pro - Excellent Condition",
          price: 75000,
          description: "Well maintained iPhone with original box",
          location: "Kathmandu",
          condition: "Like New",
          category: "electronics",
          postedAt: "2 hours ago"
        },
        {
          id: 2,
          title: "Royal Enfield Classic 350",
          price: 425000,
          description: "Well maintained bike, papers clear",
          location: "Pokhara",
          condition: "Used",
          category: "vehicles",
          postedAt: "5 hours ago"
        },
        {
          id: 3,
          title: "Wooden Study Table with Chair",
          price: 8500,
          description: "Solid wood furniture set",
          location: "Lalitpur",
          condition: "Good",
          category: "furniture",
          postedAt: "1 day ago"
        },
        {
          id: 4,
          title: "Samsung Galaxy Tab S7",
          price: 55000,
          description: "Tablet with S-Pen and case",
          location: "Kathmandu",
          condition: "Like New",
          category: "electronics",
          postedAt: "3 hours ago"
        },
        {
          id: 5,
          title: "Mountain Bike - Trek",
          price: 45000,
          description: "Perfect for trails",
          location: "Bhaktapur",
          condition: "Good",
          category: "sports",
          postedAt: "6 hours ago"
        },
        {
          id: 6,
          title: "Canon EOS 1500D",
          price: 52000,
          description: "DSLR with lens and bag",
          location: "Kathmandu",
          condition: "Like New",
          category: "electronics",
          postedAt: "4 hours ago"
        },
        {
          id: 7,
          title: "Gaming Laptop - ASUS ROG",
          price: 125000,
          description: "RTX 3060, 16GB RAM",
          location: "Kathmandu",
          condition: "Like New",
          category: "electronics",
          postedAt: "1 hour ago"
        },
        {
          id: 8,
          title: "Sofa Set - 3+2+1",
          price: 35000,
          description: "Comfortable fabric sofa",
          location: "Lalitpur",
          condition: "Good",
          category: "furniture",
          postedAt: "2 days ago"
        }
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredListings = listings.filter(listing => {
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Browse Listings
          </h1>
          <p className="text-gray-600">
            Discover items from sellers across Nepal
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <p className="text-sm text-gray-600 mb-6">
            Showing {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'}
          </p>
        )}

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </>
          ) : filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
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
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500">No listings found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}