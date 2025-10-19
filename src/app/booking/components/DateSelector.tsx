'use client'

import React, { useState } from 'react'

interface DateSelectorProps {
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  onDateClick: (day: number, monthOffset: number, currentMonth: Date) => void
}

export default function DateSelector({ checkInDate, checkOutDate, onDateClick }: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(new Date().setDate(1)))
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

  const isDisabled = (day: number, monthOffset: number) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
    date.setHours(0, 0, 0, 0)
    
    return date <= today
  }

  function dateIsSelected(day: number, monthOffset: number) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
    return date.toDateString() === checkInDate?.toDateString() || date.toDateString() === checkOutDate?.toDateString()
  }

  function dateIsBetween(day: number, monthOffset: number) {
    if (!checkInDate || !checkOutDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
    return date.getTime() >= checkInDate.getTime() && date.getTime() <= checkOutDate.getTime()
  }

  function onMouseHover(day: number, monthOffset: number) {
    setHoveredDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day))
  }

  function shouldShowPreviewRange(day: number, monthOffset: number): boolean {
    if (!checkInDate || !hoveredDate || checkOutDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
    return date > checkInDate && date <= hoveredDate
  }

  function renderCalendar(daysOffset: number, daysInMonth: number, monthOffset: number) {
    return (
      <div className="flex flex-col mx-auto">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day, index) => (
            <div key={index} className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-700">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: daysOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="w-8 h-8"></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const disabled = isDisabled(day, monthOffset)
            return (
              <div
                key={day}
                className={`w-8 h-8 flex items-center justify-center text-sm font-medium ${
                  disabled
                    ? 'text-gray-300 cursor-not-allowed line-through'
                    : dateIsSelected(day, monthOffset)
                      ? 'text-gray-700 cursor-pointer bg-[#F0A202] rounded'
                      : dateIsBetween(day, monthOffset) || shouldShowPreviewRange(day, monthOffset)
                        ? 'text-gray-700 cursor-pointer bg-orange-100 rounded'
                        : 'text-gray-700 cursor-pointer hover:bg-orange-100 rounded'
                }`}
                onClick={() => onDateClick(day, monthOffset, currentMonth)}
                onMouseOver={() => onMouseHover(day, monthOffset)}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>
    )
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
          {renderCalendar(firstDayOffset1, daysInMonth1, 0)}
          {renderCalendar(firstDayOffset2, daysInMonth2, 1)}
        </div>
      </div>
    </div>
  )
}
