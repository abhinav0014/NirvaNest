"use client"
import React, { useState } from 'react';
import { Menu, X, Search, ShoppingCart, MapPin, Compass } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const showSearch = true;

  return (
    <>
      <nav className="bg-white border-b border-neutral-200 relative z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Logo */}
            <a 
              href="/" 
              className="font-bold text-2xl text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
            >
              NirvaNest
            </a>
            
            {/* Search Bar (Desktop) - Boxy with curved edges */}
            {showSearch && (
              <div className="hidden md:flex flex-1 max-w-2xl mx-6">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search for items, categories, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm font-medium hover:border-gray-400 transition-all shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <a 
                href="/browse" 
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3"
              >
                Browse
              </a>
              <a 
                href="/sell" 
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3"
              >
                Sell
              </a>
              
              {/* Location Button */}
              <button className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors relative">
                <MapPin className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <a href="/cart">
                <button className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                </button>
              </a>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
                <a 
                  href="/auth" 
                  className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3"
                >
                  Sign In
                </a>
                <a 
                  href="/auth" 
                  className="text-sm font-semibold bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Sign Up
                </a>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="md:hidden flex items-center gap-2">
              {/* Location Button (Mobile) */}
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors relative">
                <MapPin className="w-5 h-5" />
              </button>

              {/* Cart Button (Mobile) */}
              <a href="/cart">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                </button>
              </a>

              {/* Menu Button (Mobile) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative z-50"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search - Boxy with curved edges */}
          {showSearch && (
            <div className="md:hidden pb-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm font-medium shadow-sm"
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay - Higher z-index */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-[60] transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Search/Explore Section in Mobile Menu */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-gray-50">
            <div className="relative w-full mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search items..."
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium shadow-sm"
              />
            </div>
            <a 
              href="/browse"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Marketplace</span>
            </a>
          </div>

          {/* Main Menu Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="flex flex-col gap-1">
              <a 
                href="/browse" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors py-4 px-4 hover:bg-gray-50 rounded-lg"
              >
                Browse Items
              </a>
              
              <a 
                href="/sell" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors py-4 px-4 hover:bg-gray-50 rounded-lg"
              >
                Sell an Item
              </a>
              
              <a 
                href="/auctions" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors py-4 px-4 hover:bg-gray-50 rounded-lg"
              >
                Auctions
              </a>
              
              <a 
                href="/listings" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors py-4 px-4 hover:bg-gray-50 rounded-lg"
              >
                My Listings
              </a>
            </div>
          </div>

          {/* Auth Section */}
          <div className="px-6 pb-8 pt-4 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3">
              <a 
                href="/auth" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors py-3"
              >
                Sign In
              </a>
              <a 
                href="/auth" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-base font-semibold bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop - Higher z-index */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}