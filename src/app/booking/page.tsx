import React from 'react'
import DateSelector from './components/DateSelector'

export default function page() {
  return (
    <>
      <div className="flex justify-center items-center text-2xl font-bold pt-40">
        Válassza ki az időpontot
      </div>
      <div className="grid grid-cols-3 gap-4 w-[95%] mx-auto my-16">
        <div className="col-span-2 bg-white/60 rounded-lg p-6 shadow-lg">
          <DateSelector />
        </div>
        <div className="col-span-1 bg-white/60 rounded-lg p-6 shadow-lg">
          {/* Checkout card content */}
        </div>
      </div>
    </>
  )
}
