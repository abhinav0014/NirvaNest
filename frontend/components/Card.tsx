import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

export default function Card({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md' 
}: CardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6'
  };

  const baseClasses = 'bg-white border border-neutral-200 rounded-xl shadow-card';
  const hoverClasses = hover 
    ? 'hover:shadow-lg hover:border-primary-200 transition-all duration-200 cursor-pointer' 
    : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}