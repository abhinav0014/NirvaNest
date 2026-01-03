import React from 'react'
import Card from './Card'
import { CurrencyRupeeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type Props = {
  id?: string
  title: string
  price: number
  currency?: string
  description?: string
  href?: string
}

export default function ListingCard({ id, title, price, currency = 'NPR', description, href }: Props){
  const content = (
    <Card className="flex flex-col" hover={!!href}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
          {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-primary-600 font-semibold">
        <CurrencyRupeeIcon className="w-5 h-5" />
        <span>{price}</span>
      </div>
    </Card>
  )

  if(href){
    return <Link href={href}>{content}</Link>
  }
  return content
}
