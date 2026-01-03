"use client"
import React, { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-100 relative z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <a 
              href="/" 
              className="font-semibold text-lg text-gray-900 flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>NirvaNest</span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="/browse" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Browse
              </a>
              <a 
                href="/sell" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sell
              </a>
              <a 
                href="/auctions" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Auctions
              </a>
              <a 
                href="/my-listings" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                My Listings
              </a>
              <a 
                href="/messages" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Messages
              </a>
              <a 
                href="/auth" 
                className="text-sm font-medium bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                Sign in
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors relative z-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-start justify-start h-full px-8 pt-32 gap-8">
          <a 
            href="/browse" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Browse
          </a>
          
          <a 
            href="/sell" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Sell
          </a>
          
          <a 
            href="/auctions" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Auctions
          </a>
          
          <a 
            href="/my-listings" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            My Listings
          </a>
          
          <a 
            href="/messages" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Messages
          </a>
          
          <a 
            href="/auth" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-medium bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors mt-4"
          >
            Sign in
          </a>
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