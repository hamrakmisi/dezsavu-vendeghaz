import Button from '@/components/Button'
import { useEffect, useState } from 'react'

interface PriceChangeModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  setPrice: (price: number) => void
  price: number
}

export default function PriceChangeModal({open, setOpen, setPrice, price}: PriceChangeModalProps) {
  const [tempPrice, setTempPrice] = useState(price)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTempPrice(price)
  }, [price])

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTempPrice(Number(e.target.value))
    setError('')
  }

  async function applyPriceChange() {
    setLoading(true)

    if (!tempPrice) {
      setError('Ár megadása kötelező');
      setLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/dashboard/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: tempPrice }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Price changed successfully:', data);
        setPrice(tempPrice)
        setLoading(false)
        setOpen(false);
      } else {
        setError(data.message)
        setLoading(false)
      }

    } catch (error) {
      console.error('Error during price change:', error);
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
            placeholder="Ár / éj"
            type="number" value={tempPrice}
            onChange={onInputChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            disabled={loading}
            isLoading={loading}
            text='Ár módosítása'
            variant='primary'
            className='text-lg font-bold'
            onClick={applyPriceChange}
          />
        </div>
      </div>
    </div>
  )
}
