'use client'
import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
export default function ProductSlider({images,title}:{images:string[],title:string}) {
  return <>
    <Carousel   opts={{

    loop: true
  }}
   plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
  >
  <CarouselContent>
    {images?.map((img,index)=>    
    <CarouselItem key={index}> 
               <Image src={img}  height={300}  width={300} alt={title}/>
</CarouselItem>
)}
    
  </CarouselContent>
  
</Carousel>
  </>
}
