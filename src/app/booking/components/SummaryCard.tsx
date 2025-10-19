import Button from '@/components/Button'
import React from 'react'

interface SummaryCardProps {
    checkInDate: Date | undefined
    checkOutDate: Date | undefined
}

export default function SummaryCard({ checkInDate, checkOutDate }: SummaryCardProps) {
  const nights = checkInDate && checkOutDate ? checkOutDate.getDate() - checkInDate.getDate() : 0
  const pricePerNight = 22500 //TODO: price per night
  const price = nights * pricePerNight

  function formatPrice(price: number) {
    if (!price) {
      return ''
    }
    
    return (price).toLocaleString('hu-HU', { style: 'currency', currency: 'HUF' })
  }

  function formatDate(date?: Date) {
    if (!date) {
      return ''
    }

    const dayOfWeek = date.toLocaleDateString('hu-HU', { weekday: 'long' })
    const dateStr = date.toLocaleDateString('hu-HU')
    
    return `${dateStr} (${dayOfWeek})`
  }

  function onBooking() {
    //TODO: booking
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2 basis-2/3">
        <div className="text-xl font-bold mb-2">
          A foglalásról:
        </div>
        <div className="flex flex-col gap-2 grow">
          <div className="flex font-bold flex-1">
            Bejelentkezés:
            <div className="ml-2 font-normal">
              {formatDate(checkInDate)}
            </div>
          </div>
          <div className="flex font-bold flex-1">
            Kijelentkezés:
            <div className="ml-2 font-normal">
              {formatDate(checkOutDate)}
            </div>
          </div>
          <div className="flex font-bold flex-1">
            Éjszakák száma:
            <div className="ml-2 font-normal">
              {nights ? nights : ''}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-3 border-gray-400 border-1.5" />
      <div className="flex flex-col gap-2 basis-1/3">
        <div className="flex font-bold flex-1">
          Összesen:
          <div className="ml-2 font-normal flex flex-col">
            {formatPrice(price)}
            <div className="ml-2 italic text-gray-400">
              {pricePerNight.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF' })}/éjszaka
            </div>
          </div>
        </div>
        <Button
          text='Foglalás'
          onClick={onBooking}
          variant='primary'
          className='text-lg font-bold'
        />
      </div>
    </div>
  )
}