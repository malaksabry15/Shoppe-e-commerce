import { product } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'
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
import ProductSlider from '@/components/carousel/page'
import AddToCart from '@/components/addToCart/page'
import AddToWishlist from '@/components/addToWishlist/page'

export default async function ProductDetails({ params }: { params: Params }) {
  let { productId } = await params
  

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId)
  const { data: product }: { data: product } = await res.json()
  
  return (
    <div className='my-4'>
      <Card className=' bg-[#f2e7dc6c] p-0 grid md:grid-cols-2 items-center w-3/4 mx-auto'>
        <div>
          <ProductSlider images={product?.images} title={product?.title} />
        </div>
        <div >
          <CardHeader>
            <CardDescription>{product?.brand.name}</CardDescription>
            <CardTitle>{product?.title}</CardTitle>
            <CardDescription>{product?.description}</CardDescription>
          </CardHeader>
          <CardContent className='my-4'>
            <CardDescription>{product?.category.name}</CardDescription>
            <div className='flex gap-1'>
              <MyStar />
              <MyStar />
              <MyStar />
              <MyStar />
              <MyStar />
              <p>({product?.ratingsAverage})</p>
            </div>
            <div className='mt-3 flex justify-between'>
              <p className=' font-bold'>{product?.price}EGP</p>
              <p className=' font-bold'>Quantity: {product?.quantity}</p>

            </div>
          </CardContent>
          <CardFooter className='gap-2 my-4 '>
            <AddToCart productId={product?.id} />
            <AddToWishlist productId={product?.id}/>
            </CardFooter>

        </div>
      </Card>
    </div>
  )
}
