"use client"
import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import Link from 'next/link';

type NavbarProps = {
  showSearch?: boolean;
};

export default function Navbar({ showSearch = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <nav className="bg-white border-b border-neutral-200 relative z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-5 gap-4">
            {/* Logo */}
            <Link 
              href="/" 
              className="font-bold text-xl text-primary-500 hover:text-primary-600 transition-colors flex-shrink-0"
            >
              NirvaNest
            </Link>
            
            {/* Search Bar (Desktop) */}
            {showSearch && (
              <div className="hidden md:flex flex-1 max-w-xl mx-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search items, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 flex-shrink-0">
              <Link 
                href="/browse" 
                className="text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors"
              >
                Browse
              </Link>
              <Link 
                href="/sell" 
                className="text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors"
              >
                Sell
              </Link>
              <Link 
                href="/auctions" 
                className="text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors"
              >
                Auctions
              </Link>
              <Link 
                href="/listings" 
                className="text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors"
              >
                My Listings
              </Link>
              <Link 
                href="/auth" 
                className="text-sm font-medium bg-primary-500 text-white px-5 py-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                Sign in
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-primary-500 transition-colors relative z-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden pb-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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
        <div className="flex flex-col items-start justify-start h-full px-8 pt-32 gap-8">
          <Link 
            href="/browse" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-neutral-700 hover:text-primary-500 transition-colors"
          >
            Browse
          </Link>
          
          <Link 
            href="/sell" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-neutral-700 hover:text-primary-500 transition-colors"
          >
            Sell
          </Link>
          
          <Link 
            href="/auctions" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-neutral-700 hover:text-primary-500 transition-colors"
          >
            Auctions
          </Link>
          
          <Link 
            href="/listings" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-neutral-700 hover:text-primary-500 transition-colors"
          >
            My Listings
          </Link>
          
          <Link 
            href="/auth" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors mt-4"
          >
            Sign in
          </Link>
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