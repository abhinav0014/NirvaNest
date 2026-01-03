import React from 'react'

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function Skeleton({ className = '', children }: Props){
  return (
    <div className={`skeleton ${className}`.trim()} aria-busy="true" aria-label="loading">
      {children}
    </div>
  )
}
