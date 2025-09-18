'use client'
import React, { useState, Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { UserState } from '@/redux/slice/userSlice'
import RelatedProfile from '@/components/profile/RelatedProfile.server'
import Profile from '@/components/profile/Profile'
import CDUploadImg from '@/components/ui/CDUploadImg'
import CDInputToText from '@/components/ui/CDInputToText'
import ChangePassword from '@/components/profile/ChangePassword'
import ChangeAddress from '@/components/profile/ChangeAddress'
import VerifyEmail from '@/components/profile/VerifyEmail'
import DonationExperiance from '@/components/profile/DonationExperiance'
import API from '@/api'
import DonationStat from '@/components/profile/DonationStat'
import { Check, Pencil } from 'lucide-react'

export default function Page() {
    const data = useSelector(({ user }: { user: UserState }) => user)
    const [user, setUser] = useState(data)
    const [edit, setEdit] = useState(false)
    const [updatedImg, setUpdatedImg] = useState({ public_id: '', secure_url: '' })
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const [showVerify, setShowVerify] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])




    useEffect(() => {

        setUser(data)
        if (user?.credential?.isVerify === false) {
            setShowVerify(true)
        } else {
            setShowVerify(false)
        }
        setLoading(false)
    }, [data, user?.credential?.isVerify])

    useEffect(() => {
        return () => {
            if (updatedImg.public_id) {
                (async () => {
                    try {
                        await API.media.deleteAMedia(updatedImg.public_id)
                    } catch (err) {
                        console.error('Failed to delete last image', err)
                    }
                })()
            }
        }
    }, [updatedImg.public_id])

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const saveUpdate = async () => {
        try {
            if (updatedImg.public_id) {
                setUser(prev => ({
                    ...prev,
                    profile: { ...prev.profile, img: updatedImg.secure_url },
                }))
            }

            const { id, userId, ...profile } = user.profile
            const UpdatedData = {
                profile: { ...profile, img: updatedImg.secure_url || profile.img },
            }

            const result = await API.user.updateuser(UpdatedData)
            if (result.status) {
                setMessage({ type: 'success', text: 'প্রোফাইল আপডেট হয়েছে ✅' })
                setEdit(false)
            } else {
                setMessage({ type: 'error', text: 'আপডেট ব্যর্থ হয়েছে ❌' })
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'কিছু সমস্যা হয়েছে ❌' })
        }
    }

    return (
        <div className="container mx-auto my-5 p-5 relative">
            <div className="md:flex no-wrap md:-mx-2">
                {/* Left Sidebar */}
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-red-400">
                        <div className="image overflow-hidden relative max-h-80">
                            {loading ? (
                                <div className="skeleton h-62 rounded w-full"></div>
                            ) : (
                                <CDUploadImg
                                    edit={edit}
                                    updatedImg={updatedImg}
                                    setUpdatedImg={setUpdatedImg}
                                    setUser={setUser}
                                    user={user}
                                />
                            )}
                        </div>

                        {loading ? (
                            <div className="skeleton h-6 mt-6 rounded w-4/5"></div>
                        ) : (
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                                {CDInputToText({
                                    placeholder: 'Full Name',
                                    value: user?.profile?.fullName,
                                    edit,
                                    name: 'fullName',
                                    onChange: e =>
                                        setUser(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, fullName: e.target.value },
                                        })),
                                })}
                            </h1>
                        )}

                        {loading ? (
                            <div className="skeleton h-6 mt-4 rounded w-3/5"></div>
                        ) : (
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">
                                {CDInputToText({
                                    placeholder: 'Occupation',
                                    value: user?.profile?.occupation,
                                    edit,
                                    name: 'occupation',
                                    onChange: e =>
                                        setUser(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, occupation: e.target.value },
                                        })),
                                })}
                            </h3>
                        )}
                    </div>

                    <div className="my-4"></div>


                    <Suspense fallback={<div>
                        <div className="skeleton h-6 mt-12 rounded w-6/12"></div>
                        <div className="flex w-full space-x-3 mt-4">
                            <div className="skeleton h-12 w-12 rounded-full"></div>
                            <div className="skeleton h-12 w-12 rounded-full"></div>
                            <div className="skeleton h-12 w-12 rounded-full"></div>
                            <div className="skeleton h-12 w-12 rounded-full"></div>
                        </div>
                    </div>}>
                        <RelatedProfile />
                    </Suspense>
                </div>

                {/* Right Content */}
                <div className="w-full md:w-9/12 mx-2 h-64 relative">
                    <div className="flex justify-end w-full top-0 absolute">
                        {loading ? (
                            <div ></div>
                        ) : edit ? (
                            <button
                                onClick={saveUpdate}
                                className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm transition-all"
                            >
                                <Check className="h-3.5 w-3.5" />
                                <span>Done</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => setEdit(true)}
                                className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm transition-all"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                <span>Edit Profile</span>
                            </button>
                        )}
                    </div>

                    <div className="flex justify-center w-full space-x-4 mt-8">
                        {loading ? (
                            <>
                                <div className="skeleton h-44 w-full rounded-lg"></div>
                                <div className="skeleton h-44 w-full rounded-lg"></div>
                            </>
                        ) : (
                            <>
                                {showVerify && <VerifyEmail email={user?.profile?.email} />}
                                <DonationStat user={user} rootEdit={false} />
                            </>
                        )}
                    </div>

                    <div className="my-4"></div>
                    {loading ? (
                        <div className="skeleton h-40 w-full rounded"></div>
                    ) : (
                        <Profile user={user} edit={edit} setUser={setUser} />
                    )}

                    {edit && !loading && (
                        <>
                            <div className="my-4"></div>
                            <ChangePassword />
                        </>
                    )}

                    <div className="my-4"></div>
                    {loading ? (
                        <div className="skeleton h-36 w-full rounded-lg"></div>
                    ) : (
                        <ChangeAddress rootEdit={edit} user={user} />
                    )}

                    <div className="my-4"></div>
                    {loading ? (
                        <div className="skeleton h-44 w-full rounded-lg"></div>
                    ) : (
                        <DonationExperiance rootEdit={edit} user={user} />
                    )}
                </div>
            </div>

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
