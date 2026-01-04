"use client"
import React, { useState } from 'react';
import { Menu, X, Search, ShoppingCart, MapPin } from 'lucide-react';
import Link from 'next/link';

type NavbarProps = {
  showSearch?: boolean;
};

export default function Navbar({ showSearch = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <nav className="bg-white border-b border-neutral-200 relative z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Logo */}
            <Link 
              href="/" 
              className="font-bold text-2xl text-primary-600 hover:text-primary-700 transition-colors flex-shrink-0"
            >
              NirvaNest
            </Link>
            
            {/* Search Bar (Desktop) */}
            {showSearch && (
              <div className="hidden md:flex flex-1 max-w-2xl mx-6">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search for items, categories, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-medium hover:border-neutral-300 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <Link 
                href="/browse" 
                className="text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors px-3"
              >
                Browse
              </Link>
              <Link 
                href="/sell" 
                className="text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors px-3"
              >
                Sell
              </Link>
              
              {/* Location Button */}
              <button className="p-2.5 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-full transition-colors relative">
                <MapPin className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <Link href="/cart">
                <button className="p-2.5 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-full transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-danger text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                </button>
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-neutral-200">
                <Link 
                  href="/auth" 
                  className="text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors px-3"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth" 
                  className="text-sm font-semibold bg-primary-500 text-white px-6 py-2.5 rounded-full hover:bg-primary-600 transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors relative z-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden pb-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-medium"
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-6 pt-24 pb-8">
          {/* Main Menu Items */}
          <div className="flex flex-col gap-1 mb-8">
            <Link 
              href="/browse" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-neutral-800 hover:text-primary-600 transition-colors py-4 px-4 hover:bg-neutral-50 rounded-lg"
            >
              Browse Items
            </Link>
            
            <Link 
              href="/sell" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-neutral-800 hover:text-primary-600 transition-colors py-4 px-4 hover:bg-neutral-50 rounded-lg"
            >
              Sell an Item
            </Link>
            
            <Link 
              href="/auctions" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-neutral-800 hover:text-primary-600 transition-colors py-4 px-4 hover:bg-neutral-50 rounded-lg"
            >
              Auctions
            </Link>
            
            <Link 
              href="/listings" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-neutral-800 hover:text-primary-600 transition-colors py-4 px-4 hover:bg-neutral-50 rounded-lg"
            >
              My Listings
            </Link>

            <Link 
              href="/cart" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-neutral-800 hover:text-primary-600 transition-colors py-4 px-4 hover:bg-neutral-50 rounded-lg flex items-center justify-between"
            >
              <span>Shopping Cart</span>
              <span className="bg-danger text-white text-xs px-2 py-1 rounded-full font-bold">2</span>
            </Link>
          </div>

          {/* Separator */}
          <div className="border-t border-neutral-200 my-4"></div>

          {/* Auth Section */}
          <div className="mt-auto space-y-3">
            <Link 
              href="/auth" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center text-base font-semibold text-neutral-700 hover:text-primary-600 transition-colors py-3"
            >
              Sign In
            </Link>
            <Link 
              href="/auth" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center text-base font-semibold bg-primary-500 text-white px-6 py-4 rounded-full hover:bg-primary-600 transition-colors shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-30 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}