'use client'
import { getUserToken } from "@/app/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { log } from "console";
import { ReactNode, useEffect, useState,createContext } from "react";
import getCartAction from "./_actions/getCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import addToCartaAction from "@/app/(pages)/products/_action/addToCart.action";
import toast from "react-hot-toast";


export const CartContext = createContext<{
    cartData: CartResponse | null,
    setCartData:(value: CartResponse|null)=> void,
    isLoading:boolean,
    setIsLoading:(value:boolean)=>void,
    getCart:()=>void,
    addProductToCart:(productId:string)=>void,
    userId: string | null,
    setUserId:(value: string|null)=> void,
}>({
    cartData:null,
    setCartData:()=>{},
    isLoading:false,
    setIsLoading:()=>{},
    getCart:()=>{},
    addProductToCart:()=>{},
    userId:null,
    setUserId:()=>{},

})
export default function CartContextProvider({children}:{children:ReactNode}){
    
const [cartData, setCartData] = useState<CartResponse|null>(null)
const [userId, setUserId] = useState<null|string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const session=useSession()
      const router=useRouter()
async function getCart(){
    setIsLoading(true)
   
     const data=await getCartAction()
     console.log(data)
    setCartData(data?? null)
    setUserId(String(cartData?.data?.cartOwner))
    setIsLoading(false)
}
async function addProductToCart(productId:string) {
      if(session.status=='authenticated'){
        setIsLoading(true)
        
        const data= await addToCartaAction(productId)
        data.status=='success'&& toast.success('product added successfully')
        setCartData(data)
        setUserId(String(cartData?.data?.cartOwner))
        
        setIsLoading(false)}
        else{
          router.push('/login')
        }
        
    }

useEffect(() => {

getCart()
  
}, [])

return <CartContext.Provider value={{cartData, setCartData, isLoading,setIsLoading,getCart,addProductToCart,userId,setUserId}}>
    {children}
</CartContext.Provider>
}
