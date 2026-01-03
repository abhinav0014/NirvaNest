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

  const baseClasses = 'bg-white border border-gray-200 rounded-xl shadow-sm';
  const hoverClasses = hover 
    ? 'hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer' 
    : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}