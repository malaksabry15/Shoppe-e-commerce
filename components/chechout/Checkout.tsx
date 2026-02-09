'use client'
import React, { useContext, useRef } from 'react'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import toast from 'react-hot-toast'

import { useRouter } from 'next/navigation'
import onlineCheckoutAction from './_actions/onlineCheckout.action'
import cashCheckoutAction from './_actions/cashCheckout.action'
import { CartContext } from '../context/CartContext'

export default function Checkout({cartId}:{cartId:string}) {
   const router= useRouter()
   const {setCartData}=useContext(CartContext)

    const detailsInput = useRef<HTMLInputElement|null>(null)
    const phoneInput = useRef<HTMLInputElement|null>(null)
    const cityInput = useRef<HTMLInputElement|null>(null)

    async function onlineCheckout(cartId:string) {
  const shippingAddress={
    details:detailsInput.current?.value,
    phone:phoneInput.current?.value,
    city:cityInput.current?.value,
  }

 const data=await onlineCheckoutAction(cartId,shippingAddress)
  
  if(data.status=='success'){
    window.location.href=data.session.url
  }
 }



    async function cashCheckout(cardId:string) {
  const shippingAddress={
    details:detailsInput.current?.value,
    phone:phoneInput.current?.value,
    city:cityInput.current?.value,
  }

  
  const data=await cashCheckoutAction(cartId,shippingAddress)
  
  if(data.status=='success'){
    
    router.push('/allorders')
    toast.success('order is done')
    setCartData(null)
    
  }
 }
  return <>

  <Dialog>
      <form>
        <DialogTrigger asChild>
        <Button className='bg-[#038C7F] hover:bg-[#08a091] cursor-pointer w-full  text-lg rounded-tl-none'>Proceed To Chechout</Button>

        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Make sure that you entered the correct address.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label >city</Label>
              <Input ref={cityInput} id="city"  />
            </div>
            <div className="grid gap-3">
              <Label >details</Label>
              <Input ref={detailsInput} id="details"  />
            </div>
            <div className="grid gap-3">
              <Label >phone</Label>
              <Input ref={phoneInput} id="phone"  />
            </div>
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className=' cursor-pointer' >Cancel</Button>
            </DialogClose>
            <Button onClick={()=>onlineCheckout(cartId)} className=' cursor-pointer rounded-tl-none' type="submit">visa</Button>
            <Button onClick={()=>cashCheckout(cartId)} className=' cursor-pointer rounded-tr-none' type="submit">cash</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </>
}
