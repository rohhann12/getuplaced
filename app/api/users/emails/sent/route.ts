import { getSession } from "next-auth/react"
export default function GET(){
    const session=getSession()
    
}