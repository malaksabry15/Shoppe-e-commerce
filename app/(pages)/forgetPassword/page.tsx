 'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { Loader } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.email(),
})
export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<null|string>(null)
    const router=useRouter()

     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
        method:'POST',
        body:JSON.stringify({
            email:values.email
        }),
        headers:{
            'content-type':'application/json'
        }

    })
    const data=await res.json()
    
    if(data.statusMsg=='fail'){
  setMessage(data.message)
    }
    else{
        setMessage(null)
        router.push('/verifyCode')
    }
    setIsLoading(false)
  }
  return <>
  <div className=' bg-[#f2e7dc70] min-h-[88vh] flex flex-col justify-center items-center min-h-[75vh]'>

    <h1 className=' my-3 text-3xl font-bold'>
      <span className=' text-[#038C7F]'>F</span>orgot <span className=' text-[#038C7F]'>P</span>assword
    </h1>
  <Card className=' shadow-xl p-5 w-sm'>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='my-4'>
              <FormLabel>email</FormLabel>
              <FormControl >
                <Input placeholder="enter your email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {message&&<p className=' text-sm text-red-500 '>{message}</p>}
        <Button className=' bg-[#038C7F] hover:bg-[#08a091] rounded-tl-none cursor-pointer mt-4' type="submit">{isLoading&&<Loader className=' animate-spin'/>}Submit</Button>
      </form>
    </Form>
  </Card>
  </div>
  </>
}
