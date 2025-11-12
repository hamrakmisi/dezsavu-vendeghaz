'use client'

import React, { useState } from 'react'
import DateSelector from './DateSelector'
import SummaryCard from './SummaryCard'
import FormModal from './FormModal'
import { toLocalISOString } from '@/lib/helper'

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
}

export default function BookingSummary() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: '',
    email: '',
    phone: '',
  })

  function handleDateClick(day: number, monthOffset: number, currentMonth: Date) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)

    if (checkOutDate) {
      setCheckOutDate(undefined)
      setCheckInDate(date)
      return
    }

    if (checkInDate && date < checkInDate) {
      setCheckInDate(date)
      return
    }
    
    if (!checkInDate) {
      setCheckInDate(date)
    }
    
    if (checkInDate && date > checkInDate) {
      setCheckOutDate(date)
    }
  }

  async function reserveBooking() {
    setIsLoading(true)

    try {
      if (!checkInDate || !checkOutDate) {
        console.error('Missing check-in or check-out date');
        return;
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkInDate: toLocalISOString(checkInDate),
          checkOutDate: toLocalISOString(checkOutDate),
          guestInfo,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Booking successful:', data);
        setIsLoading(false)
        setIsModalOpen(false);
      } else {
        console.error('Booking failed:', data);
        setIsLoading(false)
        alert('A foglalás során hiba történt. Kérjük, próbálja újra később.');
      }

    } catch (error) {
      console.error('Error during booking:', error);
      alert('Váratlan hiba történt. Kérjük, próbálja újra később.');
      setIsLoading(false)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 w-[95%] mx-auto my-16 max-w-[1300px]">
      <div className="col-span-2 bg-white/60 rounded-lg p-6 shadow-lg">
        <DateSelector checkInDate={checkInDate} checkOutDate={checkOutDate} onDateClick={handleDateClick} />
        {checkInDate && (
          <div
            className="ml-auto w-min text-red-500 cursor-pointer hover:scale-105 transition"
            onClick={() => {
              setCheckInDate(undefined)
              setCheckOutDate(undefined)
            }}
          >
            Törlés
          </div>
        )}
      </div>
      <div className="col-span-1 bg-white/60 rounded-lg mt-4 lg:mt-0 p-6 shadow-lg">
        <SummaryCard
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onBookingClick={() => setIsModalOpen(true)}
        />
      </div>
      <FormModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        reserveBooking={reserveBooking}
        isLoading={isLoading}
        guestInfo={guestInfo}
        setGuestInfo={setGuestInfo}
      />
    </div>
  )
}
