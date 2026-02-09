'use server'
import { getUserToken } from '@/app/Helpers/getUserToken'
type ShippingAddress = {
  details?: string;
  phone?: string;
  city?: string;
};
export default async function cashCheckoutAction(cartId:string ,shippingAddress:ShippingAddress){
    
    const token=await getUserToken()
  

  const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method:'POST',
      body:JSON.stringify(shippingAddress),
      headers:{
        token:String(token),
        'content-type':'application/json'
      }
    }
  )
  const data= await res.json()
  return data
}
