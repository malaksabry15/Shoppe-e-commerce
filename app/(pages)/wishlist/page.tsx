'use client'
import { motion } from "framer-motion"

import Loading from '@/app/loading'
import AddToCart from '@/components/addToCart/page'
import AddToWishlist from '@/components/addToWishlist/page'
import { WishlistContext } from '@/components/context/WishlistContext'
import MyStar from '@/components/starIcon/page'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { wishlist } from '@/interfaces'
import { Loader, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import deleteFromWishlistAction from './_actions/deleteFromWishlist.action'

export default function Wishlist() {
    const [deletedItem, setDeletedItem] = useState<string|null>(null)
   let {wishlist, getWishlist,isLoading,setWishlist}= useContext(WishlistContext)
   

    async function deleteFromWishlist(productId:string) {
        setDeletedItem(productId)
        const data=await deleteFromWishlistAction(productId)

        
        if(data.status=='success'){
            toast.success('product deleted')
            
            await getWishlist()
            
            
        }
        setDeletedItem(null)
     }
  return<>
  <div className=' bg-[#f2e7dc70] min-h-[86vh]'>
  {isLoading?<Loading/>: (wishlist&&wishlist?.count>0 )?<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
  {wishlist?.data.map((product,index)=>
  <motion.div
  key={product._id}
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.6,
      delay: index * 0.1,
      ease: 'easeOut',
    }}
>
  <Card  className='  m-3 even:bg-[#A9D9D0] odd:bg-[#038C7F]  px-5 hover:scale-105 hover:shadow-xl hover:shadow-[#F2E7DC] duration-200' >
          <Link className='w-full' href={'/products/' + product.id}>
            <CardHeader >
              <Image src={product?.imageCover} alt={product?.title} className='w-full ' loading='eager'   height={300} width={300} />


              
            </CardHeader>
            
            <CardContent >
              <CardDescription className=' text-gray-700 my-2'>{product?.brand.name}</CardDescription>

              <CardTitle>{product?.title.split(' ', 2).join(' ')}</CardTitle>

              <CardDescription className=' text-gray-700 my-2'>{product?.category.name}</CardDescription>
              <div className='flex'>
                <MyStar />
                <MyStar />
                <MyStar />
                <MyStar />
                <MyStar />

                <p>{product?.ratingsAverage}</p></div>
              <p className='pt-1'>price: <span className=' font-bold'>{product?.price}</span> EGP</p>
            </CardContent>
          </Link>
          <CardFooter className='  gap-2 my-4 '>
            <AddToCart productId={product?.id} />
              <Button onClick={()=>deleteFromWishlist(product.id)} className='  rounded-tr-none grow cursor-pointer'>{deletedItem==product.id?<Loader className=' animate-spin'/>:<Trash/>}Delete form wishlist</Button>

          </CardFooter>

        </Card>
        </motion.div>
)
}
</div>:
<div className=' flex min-h-[75vh] items-center justify-center flex-col'>
    <h2 className=' text-2xl my-4 font-semibold'>your Wishlist is empty</h2>
    <Link href={'/products'} >
    <Button className=' bg-[#038C7F] hover:bg-[#08a091] rounded-tl-none cursor-pointer'>add products to your Wishlist</Button>
    </Link>
    </div>
}
</div>
  </>          

}
