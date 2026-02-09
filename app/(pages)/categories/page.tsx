import { Category } from '@/interfaces'
import React from 'react'


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { error } from 'console'
export  default async function Categories() {
  
    
  const res=await fetch('https://ecommerce.routemisr.com/api/v1/categories')
    
  const {data:categories}: {data:Category[]}=await res.json()
  
    
  
  
  return <>

  <div className=' bg-[#f2e7dc70] grid grid-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3'>
    {categories?.map((category)=>
    
     
    <Card key={category._id} className=" relative mx-auto w-full max-w-sm pt-0 my-3 hover:scale-105 hover:shadow-xl hover:shadow-[#F2E7DC] duration-200">
     <Link href={'/categories/'+category._id}> 
     <div className="absolute inset-0 " />
      <img
        src={category.image}
        alt={category.name}
        className="relative z-20  w-300 h-100  brightness-60  dark:brightness-40"
      />
      <CardHeader >
        
        <CardTitle className=' mt-5 text-center'>{category.name}</CardTitle>
        
      </CardHeader>
      </Link> 
    </Card>)
    
    }
   
    
  </div>
  </>
}
