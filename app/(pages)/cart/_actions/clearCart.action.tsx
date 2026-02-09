'use server'
import { getUserToken } from '@/app/Helpers/getUserToken'
import { CartResponse } from '@/interfaces'
import React from 'react'

export default async function clearCartAction() {
    const token=await getUserToken()
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/cart',
    {
      method:'DELETE',
      headers:{
        token:String(token)
      }
    }
  )


  const data: CartResponse=await res.json()
  return data
}
