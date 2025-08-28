'use client'
import { Droplet, SendIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function CustomRootLayout() {
  const [user, setUser] = useState({})

  return (

    <div className=" bg-base-100 shadow-sm  ">
      <div className="container mx-auto navbar">
        <div className="flex-1">
          <a className=" cursor-pointer text-red-500 font-extrabold text-xl">রক্তদান</a>
        </div>
        <div className="flex gap-2">

          {user?.id ? <div className="dropdown dropdown-end">

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div> : <div className=' flex items-center'>
            <button className='btn btn-lg btn-link no-underline underline-offset-4  text-gray-600'>রক্তদাতা খুঁজুন</button>
            <button className="btn btn-lg text-red-400  no-underline underline-offset-4  btn-link ">
              <Droplet className='text-red-400' />
              রক্তদাতা হোন
            </button>

          </div>}
        </div>
      </div>
    </div>
  )
}
