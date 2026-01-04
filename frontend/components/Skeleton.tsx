import React from 'react';

type SkeletonProps = {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
};

export default function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const style = {
    width: width || undefined,
    height: height || undefined
  };

  return (
    <div 
      className={`animate-pulse bg-neutral-200 ${variantClasses[variant]} ${className}`}
      style={style}
      aria-busy="true" 
      aria-label="Loading"
    />
  );
}