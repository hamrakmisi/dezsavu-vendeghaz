'use client'

import React, { useState } from 'react'

export default function DateSelector() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
  const [isCheckInDateSelected, setIsCheckInDateSelected] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(new Date().setDate(1)))

  const monthNames = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
  ]

  const daysInMonth1 = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const daysInMonth2 = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0).getDate()

  const days = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V']

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (monthOffset: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1)
    const day = date.getDay()
    // Convert Sunday (0) to 6, and shift Monday (1) to 0
    return day === 0 ? 6 : day - 1
  }

  const firstDayOffset1 = getFirstDayOfMonth(0)
  const firstDayOffset2 = getFirstDayOfMonth(1)

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev: Date) => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 2)
      } else {
        newMonth.setMonth(prev.getMonth() + 2)
      }
      return newMonth
    })
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            className="btn btn-ghost btn-sm hover:scale-105 transition-transform"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="font-semibold text-lg text-black">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>

          <div className="font-semibold text-lg text-black">
            {currentMonth.getMonth() + 1 === 12 ?
              monthNames[0] + ' ' + (currentMonth.getFullYear() + 1) :
              monthNames[currentMonth.getMonth() + 1] + ' ' + currentMonth.getFullYear()
            }
          </div>
          
          <button
            type="button"
            onClick={() => navigateMonth('next')}
            className="btn btn-ghost btn-sm hover:scale-105 transition-transform"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex items-start justify-between w-[80%] gap-8">
          <div className="flex flex-col">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day, index) => (
                <div key={index} className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOffset1 }).map((_, i) => (
                <div key={`empty-${i}`} className="w-8 h-8"></div>
              ))}
              {Array.from({ length: daysInMonth1 }, (_, i) => i + 1).map((day) => (
                <div key={day} className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500">{day}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day, index) => (
                <div key={index} className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOffset2 }).map((_, i) => (
                <div key={`empty-${i}`} className="w-8 h-8"></div>
              ))}
              {Array.from({ length: daysInMonth2 }, (_, i) => i + 1).map((day) => (
                <div key={day} className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500">{day}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
