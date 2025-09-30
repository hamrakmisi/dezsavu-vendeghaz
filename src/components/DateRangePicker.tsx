'use client'

import React, { useState } from 'react'
import DatePicker from './DatePicker'

export interface DateRangePickerProps {
  checkInDate?: Date
  checkOutDate?: Date
  onCheckInChange?: (date: Date | undefined) => void
  onCheckOutChange?: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

export default function DateRangePicker({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  className = "",
  disabled = false,
  minDate,
  maxDate
}: DateRangePickerProps) {
  const [internalCheckIn, setInternalCheckIn] = useState<Date | undefined>(checkInDate)
  const [internalCheckOut, setInternalCheckOut] = useState<Date | undefined>(checkOutDate)

  const handleCheckInChange = (date: Date | undefined) => {
    setInternalCheckIn(date)
    
    if (date && internalCheckOut && date >= internalCheckOut) {
      setInternalCheckOut(undefined)
    }
    
    if (onCheckInChange) {
      onCheckInChange(date)
    }
  }

  const handleCheckOutChange = (date: Date | undefined) => {
    setInternalCheckOut(date)
    if (onCheckOutChange) {
      onCheckOutChange(date)
    }
  }

  const getCheckOutMinDate = () => {
    if (internalCheckIn) {
      const nextDay = new Date(internalCheckIn)
      nextDay.setDate(nextDay.getDate() + 1)
      return nextDay
    }
    return minDate ? new Date(minDate.getTime() + 24 * 60 * 60 * 1000) : new Date(Date.now() + 24 * 60 * 60 * 1000)
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">
          Bejelentkezés
        </label>
        <DatePicker
          value={internalCheckIn}
          onChange={handleCheckInChange}
          placeholder="Bejelentkezés dátuma"
          disabled={disabled}
          minDate={minDate || new Date()}
          maxDate={maxDate}
          className="w-full"
        />
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">
          Kijelentkezés
        </label>
        <DatePicker
          value={internalCheckOut}
          onChange={handleCheckOutChange}
          placeholder="Kijelentkezés dátuma"
          disabled={disabled || !internalCheckIn}
          minDate={getCheckOutMinDate()}
          maxDate={maxDate}
          className="w-full"
        />
      </div>
    </div>
  )
}
