import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brand } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



export default async function brands() {
  
  const res=await fetch('https://ecommerce.routemisr.com/api/v1/brands')
   const {data:brands}:{data:Brand[]}=await res.json()
   console.log(brands)
  return <>
   <div  className=' bg-[#f2e7dc70] grid grid-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 ' >
      {brands?.map((brand)=>
      <Link key={brand?._id}  href={'/brands/'+brand?._id}>
      <Card className=" bg-[#038C7F]   mx-auto  w-full max-w-sm my-3 hover:scale-105 duration-200 hover:shadow-xl hover:shadow-[#F2E7DC] text-center">
      <CardHeader>
    

    <Image src={brand?.image} alt={brand?.name} className='w-full ' loading='eager'   height={300} width={300} />
    
    <CardTitle className=' p-2 text-2xl text-white font-semibold'>{brand?.name }</CardTitle>

  </CardHeader>
     
      
    </Card>
    </Link> )}
    </div>
  </>
}
