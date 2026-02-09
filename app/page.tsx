'use client'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const session=useSession()
  return <>
  <div className="bg-[#f2e7dc70] min-h-[86vh] flex flex-col items-center justify-center ">
  <div className=' container text-center   px-5'>
      {session.status=='authenticated'&& <h2 className=" text-2xl font-semibold  mb-2 animate-left" >Hi {session.data.user.name}</h2>}

    <h2 className=" text-4xl md:text-5xl lg:text-6xl font-bold animate-right">Welcome to Shoppe</h2>
    <p className="p-5 text-lg md:text-xl text-gray-600 my-5">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>

    <div className=" flex gap-4 justify-center">
                <Button className='p-5 bg-[#038C7F] hover:bg-[#08a091] rounded-tl-none   rounded-md  text-lg   duration-100'><Link href={'/products'}>Shop Now</Link></Button>
          <Button className='p-5  bg-white text-black  border border-[#08a091]  rounded-md  text-lg  hover:bg-accent duration-100'><Link href={'/categories'}>Browse Categories</Link></Button>

    </div>
</div>
  </div>
  </>
}
