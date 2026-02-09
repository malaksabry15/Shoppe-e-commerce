import { Subcategory } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

export default async function SubCategories({ params }: { params: Params }) {
    let {categoryId}=await params
    
    const res= await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
    const {data:subCategories}:{data:Subcategory[]}=await res.json()
    

  return <>

  
     {subCategories?.length>0?
     <>
     <div  className='  grid grid-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ' >
      {subCategories.map((subCategory)=>
      <Link key={subCategory._id} href={'/categories/categoryId/'+subCategory.name}>
      <Card  className="mx-auto w-full max-w-sm my-3 hover:bg-accent hover:shadow-xl duration-200 text-center">
     
      <CardContent >
        <p className=' mt-5 text-black'>
          { subCategory.name}
        </p>
      </CardContent>
      
    </Card>
    </Link> )}
    </div>
    </>
     :
    <div className=' flex min-h-[75vh] items-center justify-center flex-col '>
      <p className=' text-lg text-muted-foreground font-semibold'>No products found in this category.</p>
    </div>
    }
     

  </>
}
