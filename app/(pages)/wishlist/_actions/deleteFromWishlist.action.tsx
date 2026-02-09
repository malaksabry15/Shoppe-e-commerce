'use server'

import { getUserToken } from '@/app/Helpers/getUserToken'
import { wishlist } from '@/interfaces'
import React from 'react'

export default async function deleteFromWishlistAction(productId:string) {
    const token=await getUserToken()
  const res=await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/' + productId,{
            method:'DELETE',
            headers:{
                token:String(token)
            }
        })
        const data: wishlist=await res.json()
        return data
}
