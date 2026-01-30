'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent page reload
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.message || 'Hiba történt a bejelentkezéskor.')
      }

      router.push('/admin/dashboard')

    } catch (err) {
      console.error(err)
      setError('Hiba történt a bejelentkezéskor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Bejelentkezés</h1>
        <p className="text-sm">Adminisztrátori bejelentkezés</p>
      </div>

      <div className="form-group">
        <div className="form-field">
          <label className="form-label">Felhasználónév</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Felhasználónév"
            className="input max-w-full"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">Jelszó</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Jelszó"
            className="input max-w-full"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="form-field pt-5">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            Bejelentkezés
          </button>
        </div>
      </div>
    </form>
  )
}
