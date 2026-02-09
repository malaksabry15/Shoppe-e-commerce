'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
 
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
import { UserData } from '@/interfaces'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


 const formSchema = z.object({
  name: z.string().nonempty('name is required').min(3, 'name at least 3 chars').max(20,'name at most 20 chars'),
   email:z.string().nonempty('email is required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,'invalid email'),
  password:z.string().nonempty('password is required').min(8, 'min length is 8 chars').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain uppercase, lowercase, number and special character"),
  rePassword:z.string().nonempty('rePassword is required'),
  phone:z.string().nonempty('phone number is required').regex(/^(?:\+20|0)?1[0125]\d{8}$/,'invalid phone number'),

}).refine((data)=>data.password===data.rePassword,{path:['rePassword'],message:'password and rePassword must be the same'})
export default function Register() {
  const router=useRouter()
  

 

    const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode:'onBlur',
    defaultValues: {
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone: '',
    },
  })
 
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
      const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
      method:'POST',
      body:JSON.stringify({
        name:values.name,
        email:values.email,
        password:values.password,
        rePassword:values.rePassword,
        phone:values.phone,
      }),
      headers: {
      'Content-Type': 'application/json',
    },
      
    })
    const data=await res.json()
    
    if(data.message=='success'){
      toast.success('register successfully')
      router.push('/login')

    }
    
  }
 

  return<>
  
   <div className=' bg-[#f2e7dc70] min-h-[88vh] flex flex-col justify-center items-center min-h-[75vh]'>

    <h1 className=' my-3 text-3xl font-bold'>
      <span className=' text-[#038C7F]'>R</span>egister now
    </h1>
  <Card className=' p-5 w-sm shadow-xl'>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8">
      

      <FormField
          control={form.control}
          
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="ali@example.com" {...field} />
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
                <Input type='password' {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>rePassword</FormLabel>
              <FormControl>
                <Input type='password'  {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='bg-[#038C7F] hover:bg-[#08a091] rounded-tl-none w-full cursor-pointer' type="submit">Submit</Button>
      </form>
    </Form>
              <Link className=' text-[#14ab8f] underline ' href={'/login'}> have an account ?</Link>

  </Card>
  </div>
  </>


}
