"use client"
import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import { Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import Link from 'next/link';

function SkeletonRow() {
  return (
    <Card>
      <div className="flex gap-4">
        <Skeleton className="w-20 h-20 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </Card>
  );
}

export default function MyListingsPage() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setListings([
        {
          id: 1,
          title: "iPhone 12 Pro - Excellent Condition",
          price: 75000,
          status: "active",
          views: 234,
          postedAt: "2 days ago"
        },
        {
          id: 2,
          title: "Wooden Study Table",
          price: 8500,
          status: "active",
          views: 89,
          postedAt: "1 week ago"
        },
        {
          id: 3,
          title: "Samsung Galaxy S20",
          price: 45000,
          status: "sold",
          views: 156,
          postedAt: "2 weeks ago"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredListings = listings.filter(listing =>
    filter === 'all' || listing.status === filter
  );

  const deleteListing = (id: number) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Listings
            </h1>
            <p className="text-gray-600">
              Manage your active and sold items
            </p>
          </div>
          <Link  href="/sell">
            <Button>Create New Listing</Button>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All ({listings.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'active'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Active ({listings.filter(l => l.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('sold')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'sold'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Sold ({listings.filter(l => l.status === 'sold').length})
          </button>
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : filteredListings.length > 0 ? (
            filteredListings.map(listing => (
              <Card key={listing.id}>
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">📦</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {listing.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Rs {listing.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {listing.views} views
                          </span>
                          <span>•</span>
                          <span>{listing.postedAt}</span>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded ${
                            listing.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {listing.status === 'active' ? 'Active' : 'Sold'}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteListing(listing.id)}
                          className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="text-center py-16">
              <p className="text-gray-500">No listings found.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}