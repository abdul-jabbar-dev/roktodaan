import React from 'react'
import { UserState } from '@/redux/slice/userSlice'
export default function Profile({ user }: { user: UserState }) {
  return (
    <div className="bg-white p-3 shadow-sm rounded-xl">
      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
        <span className="text-red-500">
          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </span>
        <span className="tracking-wide">About</span>
      </div>
      <div className="text-gray-700">
        <div className="grid md:grid-cols-2 text-sm">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Full Name</div>
            <div className="px-4 py-2">{user?.profile?.fullName}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Gender</div>
            <div className="px-4 py-2">{user?.profile?.gender}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Contact No.</div>
            <div className="px-4 py-2">{user?.profile?.phoneNumber}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Current Address</div>
            <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Weight</div>
            <div className="px-4 py-2">{user?.profile?.weight}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Email.</div>
            <div className="px-4 py-2">
              <a className="text-blue-800" href={"mailto:" + user?.profile?.fullName}>{user?.profile?.email || "Not Set"}</a>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Birthday</div>
            <div className="px-4 py-2">Feb 06, 1998</div>
          </div>
        </div>
      </div>
      {/* <button
                                className="block w-full text-blue-800 text-sm font-semibold rounded-xl hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                                Full Information</button> */}
    </div>
  )
}
