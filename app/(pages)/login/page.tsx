'use client'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import {signIn} from 'next-auth/react'
 
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
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'
 

const formSchema = z.object({
  email:z.email('invalid email').nonempty('email is required'),
  password:z.string().nonempty('password is required').min(6, 'min length is 6 chars')
})
export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  let searchParams= useSearchParams()
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
   const res=await signIn("credentials",{
    email: values.email,
    password:values.password,
    callbackUrl:'/',
    redirect:true,

   })
    
    
    setIsLoading(false)
  }
  return <>
  <div className='bg-[#f2e7dc70] min-h-[88vh]  flex flex-col justify-center items-center min-h-[75vh]'>

    <h1 className=' my-3 text-3xl font-bold'>
      <span className='text-[#038C7F]'>L</span>ogin now
    </h1>
  <Card className=' shadow-xl p-5 w-sm'>
       <Form {...form}>
        {searchParams.get('error')&& <h2 className=' text-red-500'>{searchParams.get('error')}</h2>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="ali@example.com" autoComplete="email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type='password' autoComplete="current-password"  {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
        <Button className='bg-[#038C7F] hover:bg-[#08a091] rounded-tl-none cursor-pointer' type="submit">{isLoading&&<Loader className=' animate-spin'/>}Login</Button>
        <Button className=' bg-[#038C7F] hover:bg-[#08a091] rounded-tr-none  cursor-pointer' ><Link href={'/forgetPassword'} >forget password</Link>  </Button>

      </div>
      </form>
    </Form>
          <Link className=' text-[#14ab8f] underline ' href={'/register'}>Don`t have account</Link>

  </Card>
  </div>
  
  </>
}
