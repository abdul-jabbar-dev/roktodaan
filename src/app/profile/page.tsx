'use client'
import DonationExperiance from '@/components/profile/DonationExperiance'
import Profile from '@/components/profile/Profile'
import CDInputToText from '@/components/ui/CDInputToText'
import CDUploadImg from '@/components/ui/CDUploadImg'
import { UserState } from '@/redux/slice/userSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import API from '@/api'
import ChangePassword from '@/components/profile/ChangePassword'
import RelatedProfile from '@/components/profile/RelatedProfile'
import UserUpdateInput from '@/types/user/user'

export default function Page() {
    const data = useSelector(({ user }: { user: UserState }) => user)
    const [user, setUser] = useState(data)
    const [edit, setEdit] = useState(false)
    const [updatedImg, setUpdatedImg] = useState({ public_id: '', secure_url: '' })
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    // লোকাল state update with redux data
    useEffect(() => {
        setUser(data)
    }, [data])

    // old image delete on unmount
    useEffect(() => {
        return () => {
            if (updatedImg.public_id) {
                ; (async () => {
                    try {
                        await API.media.deleteAMedia(updatedImg.public_id)
                    } catch (err) {
                        console.error('Failed to delete last image', err)
                    }
                })()
            }
        }
    }, [updatedImg.public_id])

    // auto clear message
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000) // 3 sec পর hide
            return () => clearTimeout(timer)
        }
    }, [message])

    const saveUpdate = async () => {
        try {
            // লোকাল state update
            if (updatedImg.public_id) {
                setUser((prev) => ({
                    ...prev,
                    profile: {
                        ...prev.profile,
                        img: updatedImg.secure_url,
                    },
                }))
            }

            const { id, userId, ...profile } = user.profile
            const UpdatedData: UserUpdateInput = {
                profile: {
                    ...profile,
                    img: updatedImg.secure_url || profile.img,
                },
            }

            // Backend এ পাঠাও
            const result = await API.user.updateuser(UpdatedData)
            if (result.status) {
                setMessage({ type: 'success', text: 'প্রোফাইল আপডেট হয়েছে ✅' })
                setEdit(false)
            } else {
                setMessage({ type: 'error', text: 'আপডেট ব্যর্থ হয়েছে ❌' })
            }
        } catch (err) {
            console.error('Failed to update user:', err)
            setMessage({ type: 'error', text: 'কিছু সমস্যা হয়েছে ❌' })
        }
    }

    return (
        <div className="container mx-auto my-5 p-5 relative">
            <div className="md:flex no-wrap md:-mx-2 ">
                {/* <!-- Left Side --> */}
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-red-400">
                        <div className="image overflow-hidden relative">
                            <CDUploadImg
                                edit={edit}
                                updatedImg={updatedImg}
                                setUpdatedImg={setUpdatedImg}
                                setUser={setUser}
                                user={user}
                            />
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                            {CDInputToText({
                                placeholder: 'Full Name',
                                value: user?.profile?.fullName,
                                edit,
                                name: 'fullName',
                                onChange: (e) =>
                                    setUser((prev) => ({
                                        ...prev,
                                        profile: {
                                            ...prev.profile,
                                            fullName: e.target.value,
                                        },
                                    })),
                            })}
                        </h1>
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">
                            {CDInputToText({
                                placeholder: 'Occupation',
                                value: user?.profile?.occupation,
                                edit,
                                name: 'occupation',
                                onChange: (e) =>
                                    setUser((prev) => ({
                                        ...prev,
                                        profile: {
                                            ...prev.profile,
                                            occupation: e.target.value,
                                        },
                                    })),
                            })}
                        </h3>

                        <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-xl shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Donation Status</span>
                                <span className="ml-auto">
                                    {edit ? (
                                        <input
                                            type="checkbox"
                                            checked={user?.profile?.activeDoner}
                                            onChange={(e) =>
                                                setUser((prev) => ({
                                                    ...prev,
                                                    profile: {
                                                        ...prev.profile,
                                                        activeDoner: e.target.checked,
                                                    },
                                                }))
                                            }
                                            className="toggle toggle-success"
                                        />
                                    ) : user?.profile?.activeDoner ? (
                                        <span className="bg-green-500 py-1 px-2 rounded-xl text-white text-sm">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="bg-red-500 py-1 px-2 rounded-xl text-white text-sm">
                                            Not Availible
                                        </span>
                                    )}
                                </span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Member since</span>
                                <span className="ml-auto">
                                    {new Date(user?.createdAt)?.toDateString()}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="my-4"></div>
                    <RelatedProfile />
                </div>

                {/* <!-- Right Side --> */}
                <div className="w-full md:w-9/12 mx-2 h-64 relative">
                    <div className="flex justify-end w-full top-0 absolute">
                        {edit ? (
                            <button
                                onClick={saveUpdate}
                                className=" bg-red-400 text-white shadow rounded px-12 py-1 hover:bg-red-500  cursor-pointer "
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setEdit(true)
                                }}
                                className=" bg-gray-400 text-white shadow rounded px-12 py-1 hover:bg-gray-500  cursor-pointer "
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    <Profile user={user} edit={edit} setUser={setUser} />

                    {edit && (
                        <>
                            <div className="my-4"></div>
                            <ChangePassword />
                        </>
                    )}

                    <div className="my-4"></div>
                    <DonationExperiance />
                </div>
            </div>

            {/* Message */}
            {message && (
                <p
                    className={`mt-3 w-full text-center fixed bottom-[60px] text-sm transition-opacity duration-500 ${message.type === 'success' ? 'text-green-600' : 'text-red-500'
                        }`}
                >
                    {message.text}
                </p>
            )}
        </div>
    )
}
