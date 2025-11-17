'use client'

import React, { useState } from 'react'
import Calendar from './Calendar'

interface DateSelectorProps {
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  onDateClick: (day: number, monthOffset: number, currentMonth: Date) => void
}

export default function DateSelector({ checkInDate, checkOutDate, onDateClick }: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const monthNames = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
  ]

  const daysInMonth1 = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const daysInMonth2 = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0).getDate()

  const days = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V']

  const getFirstDayOfMonth = (monthOffset: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1)
    const day = date.getDay()
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
        <div className="flex flex-col md:flex-row flex-wrap md:content-normal items-start justify-between w-[80%] gap-8">
          <Calendar
            days={days}
            daysOffset={firstDayOffset1}
            daysInMonth={daysInMonth1}
            monthOffset={0}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            currentMonth={currentMonth}
            onDateClick={onDateClick}
            hoveredDate={hoveredDate}
            setHoveredDate={setHoveredDate}
          />
          <Calendar
            days={days}
            daysOffset={firstDayOffset2}
            daysInMonth={daysInMonth2}
            monthOffset={1}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            currentMonth={currentMonth}
            onDateClick={onDateClick}
            hoveredDate={hoveredDate}
            setHoveredDate={setHoveredDate}
          />
        </div>
      </div>
    </div>
  )
}
