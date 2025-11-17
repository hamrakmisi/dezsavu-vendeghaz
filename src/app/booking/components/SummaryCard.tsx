import Button from '@/components/Button'
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { calculateNights, calculateTotalPrice } from '@/lib/helper'

interface SummaryCardProps {
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  onBookingClick: () => void
  onDiscountClick: () => void
  discount: number | null
}

export default function SummaryCard({ checkInDate, checkOutDate, onBookingClick, onDiscountClick, discount }: SummaryCardProps) {
  const [priceData, setPriceData] = useState<{
    totalPrice: number | null, discountAmount: number | null,
    finalPrice: number | null, pricePerNight: number | null
  }>({
    totalPrice: null,
    discountAmount: null,
    finalPrice: null,
    pricePerNight: null
  })

  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) {
      return 0
    }
    
    return calculateNights(checkInDate, checkOutDate)
  }, [checkInDate, checkOutDate])

  useEffect(() => {
    async function fetchPrice() {
      const response = await fetch('/api/price');
      const { data } = await response.json();

      setPriceData({
        totalPrice: null,
        discountAmount: null,
        finalPrice: null,
        pricePerNight: data
      })
    }

    fetchPrice()
  }, [])

  useEffect(() => {
    if (!priceData.pricePerNight) return;
    
    const { totalPrice, discountAmount, finalPrice } = calculateTotalPrice(nights, priceData.pricePerNight, discount);
    setPriceData({
      totalPrice,
      discountAmount,
      finalPrice,
      pricePerNight: priceData.pricePerNight
    });

  }, [nights, discount]);

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
          <div className="flex flex-row justify-between">
            <div className="italic text-gray-400">
              {priceData.pricePerNight &&
                `${formatPrice(priceData.pricePerNight)}/éjszaka`
              }
            </div>
            <div>
              <Button
                text={discount ? 'Kedvezmény törlése' : 'Kedvezmény aktiválása'}
                onClick={onDiscountClick}
                outline
                className='text-sm h-auto'
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="my-3 border-gray-400 border-1.5" />
      <div className="flex flex-col gap-2 basis-1/3">
        {priceData.discountAmount && (
          <div className="flex font-bold flex-1">
            Teljes ár:
            <div className="ml-auto font-normal">
              {priceData.totalPrice ? formatPrice(priceData.totalPrice) : ''}
            </div>
          </div>
        )}
        {priceData.discountAmount && (
          <div className="flex font-bold flex-1">
            Kedvezmény:
            <div className="ml-auto font-normal text-red-500">
              - {formatPrice(priceData.discountAmount)}
            </div>
          </div>
        )}
        <div className="flex font-bold flex-1">
          Összesen:
          <div className="ml-auto font-normal">
            {
              priceData.finalPrice ? formatPrice(priceData.finalPrice) : ''
            }
          </div>
        </div>
        <Button
          disabled={!checkInDate || !checkOutDate}
          text='Foglalás'
          onClick={onBookingClick}
          variant='primary'
          className='text-lg font-bold'
        />
      </div>
    </div>
  )
}