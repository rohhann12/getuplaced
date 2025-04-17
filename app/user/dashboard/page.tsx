'use client'

import { useEffect, useState } from 'react'
import { MoreHorizontal, ChevronDown, Send } from 'lucide-react'
import axios from 'axios'
import Dashboard from '../../../components/emailBox/email'

export default function Home(){
  const [data,setData]=useState([]);
  useEffect(()=>{
    const emailFetcher = async () => {
      try {
        const response = await axios.get("/api/users/emails/finder");
        console.log("response is ",typeof response)
        setData(response.data.data.data)
        console.log("window",response.data)
      } catch (error) {
        console.error("Failed to fetch email count:", error);
      }
    }
    emailFetcher()
  },[])
  
  return(
    <Dashboard emails={data} />

  )
}
