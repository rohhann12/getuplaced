"use client"
import React, { useEffect, useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const [logged, setLogged] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        setLogged(true)
        router.push('/dashboard')
      }
    }
    checkSession()
  }, [])

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      {!logged && (
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className='flex items-center gap-3 bg-white border border-gray-300 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
        >
          <FcGoogle size={24} />
          <span className='text-gray-700 font-medium'>Sign in with Google</span>
        </button>
      )}
    </div>
  )
}
