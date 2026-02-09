'use client'

import { HeartCrackIcon, HeartIcon, HeartPlusIcon, HeartPulseIcon, LucideHeartPulse } from 'lucide-react'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { WishlistContext } from '../context/WishlistContext'
import Wishlist from '@/app/(pages)/wishlist/page'
import addToWishlistAction from '@/app/(pages)/products/_action/addToWishlist.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AddToWishlist({productId}:{productId:string}) {
    const session=useSession()
    const router=useRouter()
   let{setWishlist,wishlist,getWishlist}= useContext(WishlistContext)
    async function addProductToWishlist() {
        if(session.status=='authenticated'){
const foundProduct = wishlist?.data?.some(item => item._id === productId)
       if( !foundProduct){
       const data=await addToWishlistAction(productId)
        
        if(data.status=='success'){
            toast.success('product added successfully to wishlist')
            setWishlist(data)
            await getWishlist()
        }
        }
        else{
            toast.success('product already exist in wish list')
        }
            }
            else{
                router.push('/login')
            }
    }
  return <>
  
  <HeartIcon  onClick={(()=>addProductToWishlist())} className=' cursor-pointer'/>
  </>
}
