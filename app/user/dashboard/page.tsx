'use client'

import { useEffect, useState } from 'react'
import AppSidebar from '@/components/sidebar/sidebar'

export default function AppPasswordAndSender() {
  const [appPassword, setAppPassword] = useState('')
  const [hasPassword, setHasPassword] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Fetch existing app password on mount
  useEffect(() => {
    const checkPassword = async () => {
      const res = await fetch('/api/users/savepassword') // GET request
      const data = await res.json()
  
      // console.log('Fetched password data:', data)
  
      if (res.ok && data.hasPassword && data.gmailAppPassword) {
        setHasPassword(true)
        setIsSaved(true)
        setAppPassword(data.gmailAppPassword) // This should populate the input
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

  return (
    <div className="flex h-screen w-full bg-black text-white">
      <AppSidebar />
      <div className="flex-1 flex items-start justify-center mt-10">
        <div className="max-w-md w-full bg-white text-black p-4 border rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Gmail App Password Settings</h2>

          <input
  type="text" // <- temporarily changed from 'password'
  placeholder="Enter Gmail App Password"
  value={appPassword}
  onChange={(e) => setAppPassword(e.target.value)}
  className="w-full p-2 border rounded mb-4"
/>

          <button
            onClick={savePassword}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
          >
            {isLoading ? 'Saving...' : 'Save / Update Password'}
          </button>

          <button
            onClick={sendEmails}
            disabled={!hasPassword || isLoading}
            className={`w-full p-2 rounded text-white ${!hasPassword ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isLoading ? 'Sending...' : 'Send Emails'}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
