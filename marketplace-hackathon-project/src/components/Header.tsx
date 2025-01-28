'use client';
import React from 'react'
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Form  from 'next/form'
import { TrolleyIcon } from '@sanity/icons'
import { Package } from 'lucide-react';
import useBasketStore from '@/app/(store)/store';



const Header = () => {
  const { user }= useUser();

  const itemCount = useBasketStore((state) => 
    state.items.reduce((total, item) => total + item.quantity, 0)
);

    return ( 
    <header className='flex flex-wrap justify-between items-center md:px-4 px-2 py-2'>
      {/*Top row */}
      <div className='flex w-full flex-wrap justify-between items-center '>
        <Link href='/' 
        className='text-2xl md:text-3xl font-bold font-Merienda text-blue-950 hover-opacity-50 cursor-pointer md:mx-auto my-2 md:m-0 '>
          Shopo
         </Link>

         <Form
            action='/search'
            className='w-full sm:w-auto sm:flex-1 sm:mx-4 md:mt-2 sm:mt-0'
         >
            <input type='text'
             name='query'
             placeholder='Search for Products' 
             className='bg-gray-900 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full  placeholder:text-center md:placeholder:text-start'
             />

         </Form>
          
          <div className='flex items-center space-x-4 mt-4 md:mt-0 flex-1 sm:flex-none'>
            <Link href='/basket'
            className='relative flex md:justify-center justify-end  items-center text-center space-x-2 bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded md:mt-2' 
            >
                <TrolleyIcon className='w-6 h-6'/>

                <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs '> {itemCount} </span>

             
            </Link> 
            


           {/*user area when logged in*/}
           <ClerkLoaded>
            {user && (
                <Link href='/orders'
                className='flex-1 relative flex md:justify-center justify-start sm:flex-none items-center space-x-2 bg-gray-900 hover:bg-[#24021e] text-white font-bold py-2 px-4 rounded' >
                    <Package className='w-6 h-6' />
                    <span> My Orders </span>
    
                </Link>
            )}

            {user ? (
                <div className='flex items-center  space-x-2'>
                    <UserButton />
                    <div className='hidden sm:block text-xs'>
                        <p className='text-gray-400'>Logged In</p>
                        <p className='font-bold'>{user.fullName}</p>
                    
                    </div>
                </div>
            ):
            (
                <SignInButton mode='modal' />
            )}


           </ClerkLoaded>
          
          </div>

     </div>
    </header>
  )
}

export default Header
