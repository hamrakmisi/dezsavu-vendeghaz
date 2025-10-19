'use client'

import React, { useState } from 'react'
import DateSelector from './DateSelector'
import SummaryCard from './SummaryCard'
import FormModal from './FormModal'

export default function BookingSummary() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  function handleBookingClick() {
    setIsModalOpen(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 w-[95%] mx-auto my-16 max-w-[1300px]">
      <div className="col-span-2 bg-white/60 rounded-lg p-6 shadow-lg">
        <DateSelector checkInDate={checkInDate} checkOutDate={checkOutDate} onDateClick={handleDateClick} />
      </div>
      <div className="col-span-1 bg-white/60 rounded-lg mt-4 lg:mt-0 p-6 shadow-lg">
        <SummaryCard checkInDate={checkInDate} checkOutDate={checkOutDate} onBookingClick={handleBookingClick} />
      </div>
      <FormModal open={isModalOpen} setOpen={setIsModalOpen}/>
    </div>
  )
}
