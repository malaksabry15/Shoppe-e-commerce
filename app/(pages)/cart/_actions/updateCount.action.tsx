'use server'
import { getUserToken } from '@/app/Helpers/getUserToken'
import { CartResponse } from '@/interfaces'
import React from 'react'
import { string } from 'zod'

export default async function updateCountAction(productId:string,count:number) {
  const token=await getUserToken()
 const res=await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,
    {
      method:'PUT',
      body:JSON.stringify({count}),
      headers:{
        token:String(token),
        'content-type':'application/json'
      }
    }
  )
  const data:CartResponse=await res.json()
  return data
}
