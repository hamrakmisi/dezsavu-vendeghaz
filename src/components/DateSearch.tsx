'use client'

import React, { useState } from 'react'
import DateRangePicker from './DateRangePicker'
import Button from './Button'

export default function DateSearch({onSearch}: {onSearch: (checkInDate: Date | undefined, checkOutDate: Date | undefined) => void}) {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)

  const handleCheckInChange = (date: Date | undefined) => {
    setCheckInDate(date)
    console.log(date)
  }

  const handleCheckOutChange = (date: Date | undefined) => {
    setCheckOutDate(date)
    console.log(date)
  }
  return (
    <div className="flex flex-col gap-4">
      <DateRangePicker
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        onCheckInChange={handleCheckInChange}
        onCheckOutChange={handleCheckOutChange}
      />
      <Button text="Keresés" variant="primary" className="w-full sm:w-auto" onClick={() => onSearch(checkInDate, checkOutDate)}/>
    </div>
    
  )
}
