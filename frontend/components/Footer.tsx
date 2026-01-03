import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">NirvaNest</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nepal's trusted peer-to-peer marketplace for buying and selling with confidence.
            </p>
          </div>
          
          {/* Marketplace Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Marketplace</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="/browse" className="hover:text-gray-900 transition-colors">
                  Browse Items
                </a>
              </li>
              <li>
                <a href="/sell" className="hover:text-gray-900 transition-colors">
                  Sell an Item
                </a>
              </li>
              <li>
                <a href="/auctions" className="hover:text-gray-900 transition-colors">
                  Auctions
                </a>
              </li>
              <li>
                <a href="/my-listings" className="hover:text-gray-900 transition-colors">
                  My Listings
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="/help" className="hover:text-gray-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/safety" className="hover:text-gray-900 transition-colors">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-900 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-900 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="/privacy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:text-gray-900 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/guidelines" className="hover:text-gray-900 transition-colors">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} NirvaNest. Built for Nepal's marketplace community.
            </p>
            <div className="flex items-center gap-6">
              <a href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Blog
              </a>
              <a href="/careers" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Careers
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}