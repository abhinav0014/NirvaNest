"use client"
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto bg-white border-t border-neutral-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">NirvaNest</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Nepal's trusted peer-to-peer marketplace for buying and selling with confidence.
            </p>
          </div>
          
          {/* Marketplace Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Marketplace</h4>
            <ul className="text-sm text-neutral-600 space-y-2">
              <li>
                <Link href="/browse" className="hover:text-primary-500 transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-primary-500 transition-colors">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="hover:text-primary-500 transition-colors">
                  Auctions
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-primary-500 transition-colors">
                  My Listings
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Support</h4>
            <ul className="text-sm text-neutral-600 space-y-2">
              <li>
                <Link href="/help" className="hover:text-primary-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-primary-500 transition-colors">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Legal</h4>
            <ul className="text-sm text-neutral-600 space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-primary-500 transition-colors">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-neutral-100 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              © {currentYear} NirvaNest. Built for Nepal's marketplace community.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
                About
              </Link>
              <Link href="/blog" className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
                Blog
              </Link>
              <Link href="/careers" className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}