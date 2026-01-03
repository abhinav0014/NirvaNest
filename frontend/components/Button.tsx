"use client"
import React from 'react'
import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({ children, className = '', variant = 'primary', size = 'md', loading = false, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center gap-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
    danger: "bg-danger text-white hover:bg-red-600"
  }

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <button 
      {...props} 
      disabled={loading || props.disabled}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
    >
      {loading ? <span className="animate-spin">⟳</span> : null}
      {children}
    </button>
  )
}
