import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import  ClientRequestForm from "../components/ClientRequestForm"
import  { Toaster } from 'react-hot-toast';

const Home: NextPage = () => {
  return (
    
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-900">
      <Head>
        <title>3 konect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>

      {/* <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"> */}
     
        <ClientRequestForm />
      {/* </main> */}
        
    </div>
  )
}

export default Home
