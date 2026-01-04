"use client"
import React from 'react';
import Card from './Card';
import Link from 'next/link';

type ListingCardProps = {
  id?: string;
  title: string;
  price: number;
  currency?: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  condition?: string;
  category?: string;
  postedAt?: string;
  href?: string;
  onClick?: () => void;
};

export default function ListingCard({ 
  title, 
  price, 
  currency = 'NPR', 
  description,
  location,
  imageUrl,
  condition,
  category,
  postedAt,
  href,
  onClick
}: ListingCardProps) {
  const content = (
    <Card 
      className="overflow-hidden group" 
      hover={!!onClick || !!href}
      padding="none"
    >
      {/* Image Section */}
      <div className="relative aspect-video bg-neutral-100 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <span className="text-4xl">📦</span>
          </div>
        )}
        {condition && (
          <span className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-medium text-neutral-700 shadow-sm">
            {condition}
          </span>
        )}
        {category && (
          <span className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            {category}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-semibold text-base text-neutral-900 line-clamp-2 mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
            {description}
          </p>
        )}

        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-xs text-neutral-500">{currency}</span>
          <span className="text-xl font-bold text-primary-600">
            {price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500">
          {location && <span>📍 {location}</span>}
          {postedAt && <span>{postedAt}</span>}
        </div>
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href} onClick={onClick}>{content}</Link>;
  }

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return content;
}