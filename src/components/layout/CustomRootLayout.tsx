'use client'
import { Droplet } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux' 
import { UserState } from '@/redux/slice/userSlice'
import { useUser } from '@/redux/hook/userHook'

export default function CustomRootLayout() {
  const user = useSelector(({ user }: { user: UserState }) => user)
 
  useUser() 

  return (

    <div className=" bg-base-100 shadow-sm  ">
      <div className="container mx-auto navbar">
        <div className="flex-1">
          <Link href="/" className=" cursor-pointer text-red-500 font-extrabold text-xl">রক্তদান</Link>
        </div>
        <div className="flex gap-2">

          {user?.profile?.fullName ? <div className="dropdown dropdown-end">

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  width={20}
                  height={20}
                  src="https://randomuser.me/api/portraits/men/32.jpg" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link href="/profile">
                  Profile
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div> : <div className=' flex items-center'>
            <button className='btn btn-lg btn-link no-underline underline-offset-4  text-gray-600'>রক্তদাতা খুঁজুন</button>
            <Link
              href="/register">
              <button className="btn btn-lg text-red-400  no-underline underline-offset-4  btn-link ">
                <Droplet className='text-red-400' />
                রক্তদাতা হোন
              </button></Link>

            <Link
              href="/profile">
              <button className="btn btn-lg text-red-400  no-underline underline-offset-4  btn-link ">
                <Droplet className='text-red-400' />
                profile
              </button></Link>

          </div>}
        </div>
      </div>
    </div>
  )
}
