import Button from '@/components/Button'
import React, { useState } from 'react'

interface DiscountModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  setDiscount: (discount: number) => void
}

export default function DiscountModal({open, setOpen, setDiscount}: DiscountModalProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value)
    setError('')
  }

  async function applyDiscount() {
    setLoading(true)

    if (!code) {
      setError('Kód kitöltése kötelező');
      setLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/discounts?code=' + code, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Discount applied successfully:', data);
        setDiscount(data.data)
        setLoading(false)
        setOpen(false);
      } else {
        setError(data.message)
        setLoading(false)
      }

    } catch (error) {
      console.error('Error during discount application:', error);
      alert('Váratlan hiba történt. Kérjük, próbálja újra később.');
      setLoading(false)
    }
    
    setLoading(false)
  }

  return (
    <div>
      <input className="modal-state" id="modal-2" type="checkbox" checked={open} onChange={() => setOpen(!open)} />
      <div className="modal w-full">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-md w-full">
          <label htmlFor="modal-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <input
            className={`input input-bordered max-w-full mt-6 ${error ? 'border-red-500' : ''}`}
            placeholder="Kedvezmény kód"
            type="text" value={code}
            onChange={onInputChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            disabled={loading}
            isLoading={loading}
            text='Kedvezmény aktiválása'
            variant='primary'
            className='text-lg font-bold'
            onClick={applyDiscount}
          />
        </div>
      </div>
    </div>
  )
}
