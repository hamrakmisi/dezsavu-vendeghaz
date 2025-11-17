import React from 'react'
import Button from './Button'

export default function BookingCard() {

  return (
    <div className="bg-black/40 text-white p-8 rounded-lg text-center backdrop-blur-sm max-w-2xl mx-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase">
        Dézsavű Vendégház
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Pihenjen nálunk a természet ölelésében
      </p>
      <p className="text-lg md:text-xl mb-6">
        Találd meg a számodra legideálisabb időpontot
      </p>
      <div className="mb-6 flex justify-center">
        <Button
          text="Foglalás"
          variant="primary"
          className="text-lg font-bold uppercase w-full"
          href="/booking"
        />
      </div>
    </div>
  )
}
