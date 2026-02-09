'use client'
import Loading from '@/app/loading'
import { CartContext } from '@/components/context/CartContext'
import { Button } from '@/components/ui/button'
import { Order, Orders } from '@/interfaces/orders'
import React, { useContext, useEffect, useState } from 'react'

export default function AllOrders() {
  const { cartData, isLoading, setIsLoading ,userId} = useContext(CartContext)
  const [orderData, setOrderData] = useState< Orders>([])
  const [orderId, setOrderId] = useState<string | null>(null)
  
 
  async function myOrders() {
  
  setIsLoading(true)
    
    
  
   
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    )
    const data: Orders = await res.json()
    setOrderData(data)
  
  setIsLoading(false)
}

  useEffect(() => {
 

    myOrders()
  }, [])


  return <>
 <div className=' bg-[#f2e7dc70] min-h-[86vh]'>
    {isLoading ? <Loading /> : orderData.length > 0 ?
      <div className=' container mx-auto py-6 px-4'>
        <h1 className=' text-3xl font-bold tracking-tight'>
          Order List
        </h1>
        <p className=' text-muted-foreground my-3 '>{orderData?.length} orders in your order list</p>
        <div className=' my-3 lg:col-span-2 space-y-4'>
          {orderData?.map((order) =>
            <div key={order._id} className=' flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>

              <div className=' flex-1'>
                <div className=' flex justify-between  '>
                  <div>
                    <h2 className=' text-lg font-semibold mt-1'>order: <span className=' text-muted-foreground'>#{order?.id}</span> </h2>
                    <p className=' text-lg font-semibold  mt-1'>Date: <span className=' text-muted-foreground'>{new Date(order?.createdAt).toLocaleString('en-GB', {
                      dateStyle: "medium",
                      timeStyle: "short", hour12: true
                    })}</span>  </p>
                    <p className=' text-lg font-semibold mt-1'>payment method: <span className=' text-muted-foreground' >{order?.paymentMethodType}</span>  </p>
                    <p className=' text-lg font-semibold mt-1'>Delivered: <span className=' text-muted-foreground'>{order?.isDelivered ? 'Yes' : 'No'}</span>  </p>
                    <p className=' text-lg font-semibold mt-1'>total: <span className=' text-muted-foreground'>{order?.totalOrderPrice} EGP</span>  </p>
                    {orderId === order?._id && <div className=' my-3 lg:col-span-2 space-y-4'>
                      {order?.cartItems.map((product) => <div key={product._id} className=' flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>

                        <img src={product?.product?.imageCover} alt={product.product.title} className='w-24 h-24' />
                        <div className=' flex-1'>
                          <div className=' flex justify-between  '>
                            <div>
                              <h2>{product?.product?.title.split(' ', 2).join(' ')}</h2>
                              <p className=' text-xl font-semibold mt-1'>{product.product.brand.name} . {product.product.category.name}</p>
                              <div className='my-3 flex items-center' >
                              </div>
                            </div>
                            <div className='me-2 flex flex-col text-end'>
                              <p className=' mx-2 font-semibold'>EGP {product.price}</p>

                            </div>
                          </div>

                        </div>
                      </div>)}
                    </div>}


                    <Button className=' bg-[#038C7F] hover:bg-[#08a091] rounded-tl-none my-3 cursor-pointer' onClick={() => setOrderId(orderId === order._id ? null : order._id)}>{orderId === order._id ? 'hide products' : 'show products'}</Button>
                  </div>
                  <p className=' text-sm font-semibold mt-1'>Last Update: <span className=' text-muted-foreground'>{new Date(order?.updatedAt).toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    hour12: true,
                  })}</span>  </p>


                </div>

              </div>
            </div>)}

        </div>



      </div> :
      <div className=' flex min-h-[75vh] items-center justify-center flex-col'>
        <h2 className=' text-2xl my-4'>your order list is empty</h2>

      </div>
    }
    </div>

  </>
}
