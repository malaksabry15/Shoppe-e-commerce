'use client'
import { wishlist } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";
import getWishlistAction from "./_actions/getWishlist.action";

export const WishlistContext=createContext<{
    wishlist: wishlist|null,
    setWishlist:(value:wishlist|null)=>void,
    isLoading:boolean,
    setIsLoading:(value:boolean)=>void,
    getWishlist:()=>void

}>({
    wishlist:null,
    setWishlist:()=>{},
    
    isLoading:false,
    setIsLoading:()=>{},
    getWishlist:()=>{},
})
export default function WishlistContextProvider({children}:{children:ReactNode}){
 const [wishlist, setWishlist] = useState<wishlist|null>(null)
 
     const [isLoading, setIsLoading] = useState(false)

 async function getWishlist() {
    setIsLoading(true)
    const data=await getWishlistAction()
    
    setWishlist(data)
    setIsLoading(false)
 }
useEffect(() => {

getWishlist()
  
}, [])



return <WishlistContext.Provider value={{wishlist,setWishlist,getWishlist,isLoading,setIsLoading}}>
{children}
</WishlistContext.Provider>
}