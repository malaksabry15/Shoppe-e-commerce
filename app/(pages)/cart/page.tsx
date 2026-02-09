'use client'
import Loading from '@/app/loading'
import Checkout from '@/components/chechout/Checkout'
import { CartContext } from '@/components/context/CartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces'
import { Loader, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import deleteFromCartAction from './_actions/deleteFromCart.action'
import updateCountAction from './_actions/updateCount.action'
import clearCartAction from './_actions/clearCart.action'

export default function Cart() {
  const [deletedItem, setDeletedItem] = useState<null|string>(null)
  const [updatedId, setUpdatedId] = useState<null|string>(null)
  const [clearingCart, setClearingCart] = useState<boolean>(false)
 
  
  
 const {cartData,isLoading,getCart ,setCartData,setIsLoading}= useContext(CartContext)

 useEffect(() => {
      getCart()

 }, [])
 





async function deleteItem(productId:string) {
  setDeletedItem(productId)
 const data=await deleteFromCartAction(productId)
  if(data.status=='success'){
    toast.success('product deleted successfully')
    setCartData(data)
  }
  setDeletedItem(null)
}


 async function updateCount(productId:string,count:number) {
  setUpdatedId(productId)
  const data=await updateCountAction(productId,count)
  if(data.status=='success'){
    toast.success('product quantity updated successfully')
    setCartData(data)
  }
  setUpdatedId(null)
  
 }


 async function clearCart() {
  setClearingCart(true)

  const data=await clearCartAction()
  if(data?.message =='success'){
    toast.success('all products deleted')
    setCartData(null)
  }
  setClearingCart(false)
 }


 
  return <>
  <div className=' bg-[#f2e7dc70] min-h-[86vh]'>
  {isLoading ? <Loading/>: cartData?.numOfCartItems!>0?
  <div className=' container mx-auto py-6 px-4'>
    <h1 className=' text-3xl font-bold tracking-tight'>
      Shopping Cart
    </h1>
    <p className=' text-muted-foreground mt-1 '>{cartData?.numOfCartItems} items in your cart</p>
    <div className=' grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6'>
      <div className=' lg:col-span-2 space-y-4'>
        {cartData?.data.products.map((product)=> 
        <div key={product._id} className=' flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>
          
          <img src={product?.product?.imageCover} alt={product.product.title} className='w-24 h-24'/>
          <div className=' flex-1'>
          <div className=' flex justify-between  '>
          <div>
            <h2>{product?.product?.title}</h2>
            <p className=' text-sm text-muted-foreground mt-1'>{product?.product?.brand?.name} . {product?.product?.category?.name}</p>
            <div className='my-3 flex items-center' >
            <button aria-label='decrease' className='cursor-pointer size-8 rounded-lg border hover:bg-accent' disabled={product.count==1} onClick={()=>updateCount(product.product.id,product.count-1)}>-</button>
            <span className='mx-3'>{updatedId==product.product.id?<Loader className=' size-5 animate-spin'/>: product.count}</span>
            <button aria-label='increase' className='cursor-pointer size-8 rounded-lg border hover:bg-accent'onClick={()=>updateCount(product.product.id,product.count+1)} >+</button>
          </div>
          </div>
          <div className='me-2 flex flex-col text-end'>
            <p className=' font-semibold'>EGP{product.price}</p>
            <span>each</span>
            <Button className=' bg-[#038C7F] hover:bg-[#08a091] mt-5  cursor-pointer text-center rounded-tl-none' onClick={()=>deleteItem(product.product.id)}>{deletedItem==product.product.id?<Loader className=' animate-spin'/>:'remove'}</Button>
          </div>
          </div>

        </div>
      </div>)}
       
      </div>
      <div className=' lg:col-span-1 sticky top-18'>
        <div className=' flex flex-col gap-4 rounded-xl border p-4 shadow-sm bg-card '>
          <h2>Order Summary</h2>
          <div className=' flex-1'>
          <div className=' flex justify-between pb-4 border-b mt-3 '>
            <div>
              <p >{cartData?.numOfCartItems}</p>
              <p className=' my-2'>shipping</p>
            </div>
            <div>
              <p>{cartData?.data.totalCartPrice}</p>
              <p className=' text-emerald-600 font-medium my-2'>free</p>
            </div>
          </div>
          <div className=' flex justify-between py-3'>
            <p>total</p>
            <p>{cartData?.data.totalCartPrice}</p>
          </div>
          <div className=' text-center flex flex-col gap-3 py-3'>
          <button className=' cursor-pointer   border rounded-md  text-lg py-1 hover:bg-accent duration-100'><Link href={'/products'}>Continue Shopping</Link></button>
          <Checkout cartId={String(cartData?.cartId)}/>
          </div>
          </div>
        </div>
        <div className=' flex justify-end mt-2 ' >
          
          <button onClick={()=>clearCart()} className='  rounded-tl-none flex items-center cursor-pointer  shadow border rounded-lg px-3 py-1 text-red-600'>{clearingCart?<Loader className=' animate-spin'/>:<> <Trash2 className=' size-4 me-2'/> clear </>} </button>

        </div>
          
      </div>

    </div>
  </div>:
  <div className=' flex min-h-[75vh] items-center justify-center flex-col'>
    <h2 className=' text-2xl my-4 font-semibold'>your cart is empty</h2>
    <Link href={'/products'} >
    <Button className='bg-[#038C7F] hover:bg-[#08a091] rounded-tl-none cursor-pointer'>add products to your cart</Button>
    </Link>
    </div>
  }
  </div>
 
  </>
}
