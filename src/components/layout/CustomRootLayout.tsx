'use client'
import { Droplet } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { clearUserData, fetchUser, UserState } from '@/redux/slice/userSlice'
import { getItemFromStore, removeItemFromStore } from '@/utils/store/localstore'
import UpcomingDonationBanner from '../notify/UpcomingDonationBanner'

export default function CustomRootLayout() {
  const user = useSelector(({ user }: { user: UserState & { loading: boolean; error?: string; success: boolean } }) => user);
  const dispatch = useDispatch<any>()
  useEffect(() => {
    const tokenStr = getItemFromStore()
    if (tokenStr) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const hitLogout = () => {
    removeItemFromStore()
    dispatch(clearUserData())
  }

  return (

    <div className=" bg-base-100 shadow-sm  ">
      <div className="container mx-auto navbar">

        <div className="flex-1">
          <Link href="/" className=" cursor-pointer text-red-500 font-extrabold text-xl">রক্তদান</Link>
        </div>
        <div className="flex gap-2">
          {(typeof user?.id === 'string' || typeof user?.id === 'number') ?
            <div className=' flex items-center'>

              <Link
                className='btn  btn-lg btn-link no-underline underline-offset-4  text-gray-600'
                href="/request">
                রক্তের জন্য আবেদন
              </Link>

              <Link
                href="/donor" className='btn mr-6 btn-lg btn-link no-underline underline-offset-4  text-gray-600'>রক্তদাতা খুঁজুন
              </Link>

              <div className="dropdown dropdown-end">

                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

                  <div className="w-10 rounded-full">
                    <Image
                      alt={user?.profile?.fullName || "Donor"}
                      width={20}
                      height={20}
                      src={user?.profile?.img || "https://avatar.iran.liara.run/public/boy"} />
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
                  <li onClick={hitLogout}><a>Logout</a></li>
                </ul>
              </div>

            </div>
            :
            <div className=' flex items-center'>

              <Link
                href="/donor">
                <button className='btn btn-lg btn-link no-underline underline-offset-4  text-gray-600'>রক্তদাতা খুঁজুন</button>
              </Link>

              <Link
                href="/register">
                <button className="btn btn-lg text-red-400  no-underline underline-offset-4  btn-link ">
                  <Droplet className='text-red-400' />
                  রক্তদাতা হোন
                </button>
              </Link>
            </div>}
        </div>
      </div>
      <UpcomingDonationBanner user={user} />
    </div>
  )
}
