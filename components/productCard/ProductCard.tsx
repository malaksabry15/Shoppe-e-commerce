'use client'
import React from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MyStar from '@/components/starIcon/page'
import { HeartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AddToCart from '@/components/addToCart/page'
import AddToWishlist from '@/components/addToWishlist/page'
import { product } from '@/interfaces'
export default function ProductCard({product,index}:{product:product,index:number}) {
  return <>
    <motion.div 
  key={product._id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.6,
      delay:  .1,
      ease: 'easeOut',
    }}
>
  <Card  className={`m-3 ${index%2==0?'bg-[#A9D9D0]':'bg-[#038C7F]'}  px-5 hover:scale-105 hover:shadow-xl hover:shadow-[#F2E7DC] duration-200`} >
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
            <AddToWishlist productId={product?.id} />
          </CardFooter>

        </Card>
        </motion.div>
  </>
}
