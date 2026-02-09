import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return <>
  <div className="min-h-screen flex justify-center items-center">
    
    <h1> <Loader className=' animate-spin size-10'/> </h1>
  </div>
  </>

}
