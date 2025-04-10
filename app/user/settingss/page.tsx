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

  // Fetch existing app password on mount
  useEffect(() => {
    const checkPassword = async () => {
      const res = await fetch('/api/users/savepassword') // GET request
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

  const sendEmails = async () => {
    if (!hasPassword) {
      setMessage('Please save your Gmail app password first.')
      return
    }

    setIsLoading(true)
    const res = await fetch('/api/users/emails/sender', { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setMessage('Emails sent successfully.')
    } else {
      setMessage(data.message || 'Failed to send emails.')
    }
    setIsLoading(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-[80vh] w-full px-4 md:px-0">
      <div className="w-full max-w-md bg-white text-black p-4 md:p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Gmail App Password Settings</h2>

        <div className="mb-4 md:mb-6">
          <label htmlFor="appPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Gmail App Password
          </label>
          <div className="relative">
            <input
              id="appPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Gmail App Password"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value)}
              className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <button
            onClick={savePassword}
            disabled={isLoading}
            className="w-full bg-black text-white p-2.5 md:p-3 rounded-lg font-medium transition-all duration-300 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {isLoading ? 'Saving...' : 'Save / Update Password'}
          </button>

          <button
            onClick={sendEmails}
            disabled={!hasPassword || isLoading}
            className={`w-full p-2.5 md:p-3 rounded-lg font-medium text-white transition-all duration-300 text-sm md:text-base ${
              !hasPassword 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black hover:bg-gray-500'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send Emails'}
          </button>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
            message.includes('successfully') 
              ? 'bg-gray-100 text-gray-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
