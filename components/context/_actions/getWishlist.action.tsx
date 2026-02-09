'use server'
import { getUserToken } from '@/app/Helpers/getUserToken'
import { wishlist } from '@/interfaces'
import React from 'react'

export default async function getWishlistAction() {
 const token=await getUserToken()
 const res=await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers:{
            token:String(token)
        }
    })
    if (!res.ok) {
    const text = await res.text()
    
    return null
  }
    const data:wishlist=await res.json()
    return data

}
