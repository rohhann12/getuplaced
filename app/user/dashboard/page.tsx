'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { columns } from "../../../components/newtable/column"
import { DataTable } from "../../../components/newtable/newTable"

export default function DemoPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetcher() {
      try {
        const response = await axios.get("http://localhost:3000/api/users/emails/finder")
        console.log(response.data.data)
        setData(response.data.data) // Adjust based on actual structure
      } catch (err) {
        console.error("Error fetching data", err)
      }
    }

    fetcher()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1>User Dashboard</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
