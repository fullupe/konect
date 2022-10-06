
import React from 'react'
import {AiOutlineArrowDown} from "react-icons/ai"
import { useRouter } from 'next/router'

function Success() {
    const router = useRouter()
  return (
    <div className="flex flex-col space-y-12 items-center justify-center h-screen bg-slate-500 ">

        <div className="flex space-y-1  flex-col justify-center items-center w-1/2 h-64 bg-red-400 rounded-sm shadow-2xl "> 

        <div className="overflow-hidden flex flex-col">
       <p className="text-2xl text-white text-center">Your submission has been </p> 
       <p className="text-2xl text-white text-center">successful!</p> 
       <p className="text-sm text-white text-center">Thanks! We have received your submission and we'll be in touch really soon.</p> 
        </div>  
            
            <div><AiOutlineArrowDown className="text-4xl text-yellow-900 animate-bounce"/></div>
       <div onClick={()=>router.push('/')} className=" animate-pulse text-2xl text-green-500 cursor-pointer"> Click to Submit Another </div>
        </div>
    </div>
  )
}

export default Success 