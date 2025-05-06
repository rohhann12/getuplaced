'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function AppPasswordAndSender() {
  const [appPassword, setAppPassword] = useState('')
  const [hasPassword, setHasPassword] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const checkPassword = async () => {
      const res = await fetch('/api/users/savepassword')
      const data = await res.json()

      if (res.ok && data.hasPassword && data.gmailAppPassword) {
        setHasPassword(true)
        setIsSaved(true)
        setAppPassword(data.gmailAppPassword)
      }
    }
    checkPassword()
  }, [])

  const savePassword = async () => {
    setIsLoading(true)
    const res = await fetch('/api/users/savepassword', {
      method: 'POST',
      body: JSON.stringify({ appPassword }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    if (res.ok) {
      setIsSaved(true)
      setHasPassword(true)
      setMessage('App password saved successfully.')
    } else {
      setMessage(data.message || 'Failed to save app password.')
    }
    setIsLoading(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex bg-black text-white p-3">
      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-4xl font-extrabold mb-2">Instructions</h1>
          <h2 className="text-xl">1. Use the same Gmail ID to generate the App Password</h2>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#111] rounded-2xl p-8 w-full max-w-md gap-6">
          <h2 className="text-2xl font-bold text-center">Gmail App Password</h2>
          <div className="relative w-full">
            <input
              id="appPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Gmail App Password"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value)}
              className="w-full p-3 bg-black border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent pr-10 text-white"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <button
            onClick={savePassword}
            disabled={isLoading}
            className="w-full bg-white text-black p-3 rounded-lg font-medium hover:bg-gray-400 disabled:opacity-50 text-sm"
          >
            {isLoading ? 'Saving...' : 'Save / Update Password'}
          </button>
          {message && (
            <div
              className={`mt-2 p-2 rounded-lg text-center text-sm ${
                message.includes('successfully')
                  ? 'bg-green-100 text-green-900'
                  : 'bg-red-100 text-red-900'
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <div className="rounded-2xl p-6 flex items-center justify-center">
          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/WzYoRv0tJg8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          >
        </iframe>
        </div>
      </div>
    </div>
  )
}
