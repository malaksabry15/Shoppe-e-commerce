"use server"

import { getUserToken } from '@/app/Helpers/getUserToken'
import React from 'react'

export default async function addToCartaAction(productId:string) {
   const token=await getUserToken()
     const res=await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
            method:'POST',
            body:JSON.stringify({productId}),
            headers:{
             token: String(token),
           'content-type':'application/json'

            }
        })
        const data= await res.json()
        return data

 
}
