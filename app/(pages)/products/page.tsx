
import { product } from '@/interfaces'

import React from 'react'
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
import ProductCard from '@/components/productCard/ProductCard'
export default async function Products() {
  
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const { data: products }: { data: product[] } = await res.json()
  return <>
    <div className=" bg-[#f2e7dc70] grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3 ">
      {products?.map((product,index) => 
      <ProductCard key={product._id} product={product} index={index} />

        

      )}
    </div>
  </>
}
