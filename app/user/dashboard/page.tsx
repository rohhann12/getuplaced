// 'use client'
// import { useEffect, useState } from 'react'
import axios from 'axios'
// import Dashboard from '../../../components/emailBox/email'

// export default function Home(){
//   const [sent, setSent] = useState<number>(0);
//   const [data,setData]=useState([]);
//   useEffect(()=>{
//     const emailFetcher = async () => {
//       try {
//         const response = await axios.get("/api/users/emails/finder");
//         console.log("response is ",typeof response)
//         setData(response.data.data.data)
//         console.log("window",response.data)
//       } catch (error) {
//         console.error("Failed to fetch email count:", error);
//       }
//     }
//     const emailCounter = async () => {
//       try {
//         const response = await axios.get('/api/users/dashboard');
//         setSent(0);
//       } catch (error) {
//         console.error('Failed to fetch email count:', error);
//       }
//     };
//     emailFetcher()
//     emailCounter()
//   },[])
  
//   return(
//     <Dashboard prop={data} calls={sent} />

//   )
// }
import { Data, columns } from "../../../components/newtable/column"
import { DataTable } from "../../../components/newtable/newTable"
import { Button } from '@/components/ui/button'
// import { useEffect } from 'react'

async function getData(): Promise<Data[]> {
  // useEffect(()=>{
  //   async function fetcher(){
  //     const data2=await axios.get("http://localhost:3000/api/users/emails/finder")
  //     console.log(data2.data.data)
  //   }
  //   fetcher()
  // },[])
  // Fetch data from your API here.
  return [
    {
      id: '6c3edc3a-a27e-40e3-8e3b-d731b808eb6f',
      email: 'nitin@naptapgo.com',
      ctoName: 'Nitin Malhotra',
      companyName: 'NapTapGo',
      Template:"spdnnr"
    },
    {
      id: 'dca399cf-bbfc-4e7b-b31f-b0e53457536d',
      email: 'sanjay@spyne.ai',
      ctoName: 'Sanjay Varnwal',
      companyName: 'Spyne',
      Template:"spdnnr"
    }
  ]
}

export default async function DemoPage() {
  const data = await getData()
  return (
    <>
  <div className="container mx-auto py-10">

  <h1>User Dashboard</h1>
  {/* compo for nos of emails sent */}
    <DataTable columns={columns} data={data} />
  </div>
</>

  )
}
