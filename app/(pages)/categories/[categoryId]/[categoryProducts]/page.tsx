import { product } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
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
import { HeartIcon} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AddToCart from '@/components/addToCart/page'
import AddToWishlist from '@/components/addToWishlist/page'
import ProductCard from '@/components/productCard/ProductCard'

export default async function CategotyProducts({params}:{params:Params}) {
    let {categoryProducts}=await params
    let decodedCategoryProducts= decodeURIComponent(String(categoryProducts))
    
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/products')
        const {data:products}:{data:product[]}=await res.json()
        


    let filteredProducts= products.filter((product)=>product.subcategory[0].name==decodedCategoryProducts)
  return (
    <div>
        {filteredProducts.length>0?  
        <div className=" bg-[#f2e7dc70] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3 ">
  {filteredProducts?.map((product,index) => (
   <ProductCard key={product._id} product={product} index={index} />
  ))}
</div>
:
 <div className=' flex min-h-[75vh] items-center justify-center flex-col '>
      <p className=' text-lg text-muted-foreground font-semibold'>No products found in this subcategory.</p>
    </div>

}
      
      
    </div>
  )
}
