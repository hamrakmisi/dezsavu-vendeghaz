'use client'

import React from 'react'
import DateSearch from './DateSearch'

export default function SearchCard() {
  const handleSearch = (checkInDate: Date | undefined, checkOutDate: Date | undefined) => {
    console.log('Searching for:', checkInDate, checkOutDate)
    // TODO: implement search logic
  }

  return (
    <div className="bg-black/40 text-white p-8 rounded-lg text-center backdrop-blur-sm max-w-2xl mx-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase">
        Dézsavű Vendégház
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Pihenjen nálunk a természet ölelésében
      </p>
      <div className="mb-6 flex justify-center">
        <DateSearch onSearch={handleSearch} />
      </div>
    </div>
  )
}
