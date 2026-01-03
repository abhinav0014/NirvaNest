import React from 'react'
import clsx from 'clsx'

type CardProps = {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = false }: CardProps){
  return (
    <div className={clsx("bg-white border border-neutral-200 rounded-lg p-4 shadow-card", hover && "hover:shadow-lg hover:border-primary-200 transition", className)}>
      {children}
    </div>
  )
}
