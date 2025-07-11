'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { columns } from "../../../components/newtable/column"
import { DataTable } from "../../../components/newtable/newTable"

export default function DemoPage() {
  const [sent, setSend] = useState(0)

  useEffect(() => {
    async function emailSender() {
      try {
        const emailNumber = await axios.get("/api/users/dashboard")
        setSend(emailNumber.data.message.sentEmail) 
        console.log(emailNumber.data)
      } catch (error) {
        console.log(error)
      }
    }
    emailSender()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-white mb-8">User Dashboard</h1>

      <div className="bg-white shadow-md rounded-xl p-6 mb-10 text-start">
        <h2 className="text-lg font-semibold text-gray-700">Number of Emails Sent</h2>
        <p className="text-4xl font-bold text-black mt-2">{sent}</p>
      </div>

      <div className="">
        <DataTable columns={columns}  />
      </div>
    </div>
  )
}
