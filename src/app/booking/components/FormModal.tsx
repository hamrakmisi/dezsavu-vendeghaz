import { useState } from 'react'
import Form from './Form'
import Button from '@/components/Button'
import { GuestInfo } from './BookingSummary'

interface FormModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  reserveBooking: () => void
  isLoading: boolean
  guestInfo: GuestInfo
  setGuestInfo: (guestInfo: GuestInfo) => void
}

export interface ErrorInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
  termsAndConditionsChecked: boolean | null;
}

export default function FormModal({open, setOpen, reserveBooking, isLoading, guestInfo, setGuestInfo}: FormModalProps) {
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState(false)
  const [errors, setErrors] = useState<ErrorInfo>({
    name: null,
    email: null,
    phone: null,
    termsAndConditionsChecked: null,
})

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePhone(phone: string): boolean {
    const digitsOnly = phone.replace(/[^\d+]/g, '')
    return /^\+\d{6,14}$/.test(digitsOnly)
  }

  function validate() {
    const currentErrors = {...errors}
    if (!guestInfo.name) {
      currentErrors.name = 'A mező kitöltése kötelező'
    }

    if (!guestInfo.email) {
      currentErrors.email = 'A mező kitöltése kötelező'
    } else if (!validateEmail(guestInfo.email)) {
      currentErrors.email = 'Érvénytelen email cím formátum'
    }

    if (!guestInfo.phone) {
      currentErrors.phone = 'A mező kitöltése kötelező'
    } else if (!validatePhone(guestInfo.phone)) {
      currentErrors.phone = 'Kérjük, használja a +[országkód] [telefonszám] formátumot (pl.: +36 30 123 4567)'
    }

    if (!termsAndConditionsChecked) {
      currentErrors.termsAndConditionsChecked = false
    }
    
    return currentErrors
  }

  function handleContinueClick() {
    const currentErrors = validate()
    
    if (currentErrors.name || currentErrors.email || currentErrors.phone || currentErrors.termsAndConditionsChecked === false) {
      setErrors(currentErrors)
      return
    }
    
    reserveBooking()
  }

  function disableContinueButton() {
    if (isLoading) {
      return true
    }

    if (!guestInfo.name || !guestInfo.email || !guestInfo.phone || !termsAndConditionsChecked) {
      return true
    }

    return false
  }
  
  return (
    <>
      <input className="modal-state" id="modal-1" type="checkbox" onChange={() => setOpen(!open)} checked={open} />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3xl w-full">
          <h2 className="text-xl">Személyes adatok</h2>
          <Form
            guestInfo={guestInfo}
            setGuestInfo={setGuestInfo}
            errors={errors}
            setErrors={setErrors}
            termsAndConditionsChecked={termsAndConditionsChecked}
            setTermsAndConditionsChecked={setTermsAndConditionsChecked}
          />
          <div className="flex gap-3 justify-end">
            <Button text="Mégsem" onClick={() => setOpen(!open)}/>
            <Button
              text="Tovább a fizetéshez"
              onClick={handleContinueClick}
              variant="primary"
              className="font-bold"
              isLoading={isLoading}
              disabled={disableContinueButton()}
            />
          </div>
        </div>
      </div>
    </>
  )
}
