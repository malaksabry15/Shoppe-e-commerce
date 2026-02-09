'use server'

import { getUserToken } from '@/app/Helpers/getUserToken'
import React from 'react'


type ShippingAddress = {
  details?: string;
  phone?: string;
  city?: string;
};
export default async function onlineCheckoutAction(cartId:string,shippingAddress:ShippingAddress) {
  const token=await getUserToken()
    
  
  const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method:'POST',
      body:JSON.stringify(shippingAddress),
      headers:{
        token:String(token),
        'content-type':'application/json'
      }
    }
  )
    const data= await res.json()
    return data
}
