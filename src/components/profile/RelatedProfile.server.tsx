
import API from '@/api'
import { UserState } from '@/redux/slice/userSlice';
import React from "react";
import getDefaultImg from '@/utils/DefaultImg';
import Link from 'next/link';
import Image from 'next/image';

const RelatedProfile = async () => {
    const users = await API.user.getUsers();
    if (users?.error) return <h1 className="text-red-500 font-bold">{users?.error}</h1>
    else return (
        <div className="bg-white p-3 ">
            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-red-500">
                    <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </span>
                <span>Similar Donor</span>
            </div>

            <div className="grid grid-cols-3">
                {users?.data?.map((user: UserState, i: number) => (
                    <div key={i} className="my-2 ">
                        <div className="text-center">
                            <Link className={'active:text-red-600 visited:text-blue-900 '} href={'/donor/' + user.id} > <Image
                                height={60}
                                width={60}
                                className="h-16 hover:scale-110 w-16 rounded-full mx-auto"
                                src={user?.profile?.img || getDefaultImg(user.profile.gender as "male" | "female")}
                                alt={user?.profile?.fullName || "User"}
                            /></Link>
                                <Link className={'active:text-red-600 visited:text-blue-900'} href={'/donor/' + user.id} ><span  className="text-main-color ">{user?.profile?.fullName || "Anonymous"}</span></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedProfile
