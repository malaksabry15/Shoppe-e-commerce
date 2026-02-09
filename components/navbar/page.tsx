'use client'
import React, { useContext, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import  Link from 'next/link'
import { HeartIcon, Loader, Menu, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { signOut, useSession } from 'next-auth/react'
import { ulid } from 'zod'



export default function Navbar() {
  let {cartData,isLoading,setUserId}=useContext(CartContext)
  const [openMenu, setOpenMenu] = useState(false)
  
  let session=useSession()
 
  return <>
 

<nav className=' bg-[#027373] shadow-xl shadow-[#a9d9d064]  text-white text-2xl font-semibold p-4 sticky top-0 z-50'>
  <div className="container mx-auto">
    <div className="flex justify-between items-center p-4 ">
      <h1 className=' text-3xl font-bold shadow-2xl text-shadow-2xs text-shadow-[#8fe3d3]'>SHOPPE</h1>


 <NavigationMenu className=' hidden md:flex'>
  <NavigationMenuList>

     <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/">Home</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>


<div className=" items-center gap-2 hidden md:flex">
  {session.status=='authenticated'&& <h2 >Hi {session.data.user.name}</h2>}
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <UserIcon className=' cursor-pointer'/> 
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      
      {session.status=='authenticated'?<><DropdownMenuLabel>My Account</DropdownMenuLabel>
      <Link href={'/allorders'}><DropdownMenuItem className=' cursor-pointer'>My Orders</DropdownMenuItem></Link>
      <DropdownMenuItem className=' cursor-pointer' onClick={()=>signOut({
        callbackUrl:'/'
      })}>Logout</DropdownMenuItem></>:<><Link href={'/login'}><DropdownMenuItem className=' cursor-pointer'>Login</DropdownMenuItem></Link>
      <Link href={'/register'}><DropdownMenuItem className=' cursor-pointer'>Register</DropdownMenuItem></Link></>}
      
      

    </DropdownMenuGroup>

  </DropdownMenuContent>
</DropdownMenu>
{session.status=='authenticated'&&<div className=' relative'>
  <Link href={'/cart'}>
  <ShoppingCartIcon/>
  
<Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full bg-white text-black">
  {isLoading ? (
    <Loader className="animate-spin" />
  ) : cartData?.numOfCartItems! > 0 ? (
    cartData?.numOfCartItems
  ) : (
    '0'
  )}
</Badge>  </Link>   
  <Link href={'/wishlist'}>
  <HeartIcon/>
  </Link>
    
</div>}

</div>
 <div className='md:hidden '>
  <Menu onClick={()=>setOpenMenu(!openMenu)} className=' cursor-pointer'/>
    
  
 </div>

    </div>
  </div>

</nav>
<div className={`
       fixed right-0 left-0 z-0
     rounded-bl-2xl rounded-br-2xl
    bg-[#A9D9D0] shadow-2xl py-4
    flex flex-col items-center text-center
    transition-all duration-300 ease-in-out
    font-semibold
    ${openMenu
      ? ' translate-y-0 z-10'
      : ' -translate-y-full '}
  `}  >
    <NavigationMenu >
  <NavigationMenuList className=' flex flex-col '>

<NavigationMenuItem >
      <NavigationMenuLink asChild   >
        <Link  href="/" onClick={()=>setOpenMenu(false)}>Home</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem >
      <NavigationMenuLink asChild   >
        <Link  href="/products" onClick={()=>setOpenMenu(false)}>Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/brands" onClick={()=>setOpenMenu(false)}>Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/categories" onClick={()=>setOpenMenu(false)}>Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

{session.status=='authenticated'?<ul className=' my-3 text-sm'>

  <li className=' p-2'><Link href={'/allorders'}className=' cursor-pointer ' onClick={()=>setOpenMenu(false)}>My Orders</Link></li>
  <li className=' cursor-pointer p-2  'onClick={() => {
    setOpenMenu(false)
    signOut({
      callbackUrl: '/',
    })
  }}>Logout</li>
</ul>:<ul className=' my-2 text-sm '>
  <li className='p-2 '>
    <Link href={'/login'} className=' cursor-pointer   ' onClick={()=>setOpenMenu(false)}>Login</Link>
  </li>
  <li className='  p-2'>
    <Link href={'/register'} className=' cursor-pointer   ' onClick={()=>setOpenMenu(false)}>Register</Link>

  </li>
</ul>
}

{session.status=='authenticated'&&<div className=' relative flex flex-col items-center gap-3'>
  <Link href={'/cart'} onClick={()=>setOpenMenu(false)}>
  <ShoppingCartIcon/>
  
<Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full bg-white text-black">
  {isLoading ? (
    <Loader className="animate-spin" />
  ) : cartData?.numOfCartItems! > 0 ? (
    cartData?.numOfCartItems
  ) : (
    '0'
  )}
</Badge>  </Link>   
  <Link href={'/wishlist'} onClick={()=>setOpenMenu(false)}>
  <HeartIcon/>
  </Link>
    
</div>}

  </div>
  </>
}
