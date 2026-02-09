'use client'

import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/CartContext'
import addToCartaAction from '@/app/(pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function AddToCart({productId}:{productId:string}) {
  const session=useSession()
  const router=useRouter()
    const [isLoading, setIsLoading] = useState(false)
    let{addProductToCart}=useContext(CartContext)

    
    
  return <>
  
  <Button onClick={()=>addProductToCart(productId)} className=' rounded-tl-none grow cursor-pointer'>{isLoading?<Loader className=' animate-spin'/> :<ShoppingCart/>}Add to cart</Button>
  
  
  </>
}
