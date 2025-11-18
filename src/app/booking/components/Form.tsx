import { useState } from 'react'
import TermsAndConditionsModal from './TermsAndConditionsModal'
import { ErrorInfo } from './FormModal'
import { GuestInfo } from "./BookingSummary";

interface FormProps {
  guestInfo: GuestInfo
  setGuestInfo: (guestInfo: GuestInfo) => void
  errors: ErrorInfo
  setErrors: (errors: ErrorInfo) => void
  termsAndConditionsChecked: boolean
  setTermsAndConditionsChecked: (checked: boolean) => void
}

export default function Form({guestInfo, setGuestInfo, errors, setErrors, termsAndConditionsChecked, setTermsAndConditionsChecked}: FormProps) {
  const [termsAndConditionsOpen, setTermsAndConditionsOpen] = useState(false)

  function handleValueChange(key: string, value: string) {
    setGuestInfo({...guestInfo, [key]: value})
    setErrors({...errors, [key]: null})
  }

  function getInputClass(error: string | null) {
    if (error) {
      return 'input max-w-full border-red-500'
    }
    return 'input max-w-full'
  }

  function onTermsAndConditionsCheckedChange() {
    setTermsAndConditionsChecked(!termsAndConditionsChecked)
    setErrors({...errors, termsAndConditionsChecked: true})
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="form-group">
        <div className="form-field">
          <label className="form-label">Név</label>
          <input value={guestInfo.name} onChange={(e) => handleValueChange('name', e.target.value)}
            placeholder="Jhon Doe" type="text" className={getInputClass(errors.name)} />
          <label className="form-label">
            <span className="form-label-alt text-error">{errors.name}</span>
          </label>
        </div>
        <div className="form-field">
          <label className="form-label">Email cím</label>
          <input value={guestInfo.email} onChange={(e) => handleValueChange('email', e.target.value)}
            placeholder="john.doe@example.com" type="email" className={getInputClass(errors.email)} />
          <label className="form-label">
            <span className="form-label-alt text-error">{errors.email}</span>
          </label>
        </div>
        <div className="form-field">
          <label className="form-label">Telefon</label>
          <input value={guestInfo.phone} onChange={(e) => handleValueChange('phone', e.target.value)}
            placeholder="+36 123 456 789" type="tel" className={getInputClass(errors.phone)} />
          <label className="form-label">
            <span className="form-label-alt text-error">{errors.phone}</span>
          </label>
        </div>
        <div className="form-field">
          <div className="form-control justify-between">
            <div className="flex gap-2">
              <input type="checkbox" className={"checkbox" + (errors.termsAndConditionsChecked === false ? " border-red-500" : "")}
                onChange={onTermsAndConditionsCheckedChange}
                checked={termsAndConditionsChecked}
              />
              <div>Elolvastam és elfogadom a foglalási
                <a className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => setTermsAndConditionsOpen(true)}
                > feltételeket </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TermsAndConditionsModal
        open={termsAndConditionsOpen}
        setOpen={setTermsAndConditionsOpen}
        setTermsAndConditionsChecked={setTermsAndConditionsChecked}
      />
    </div>
  )
}
