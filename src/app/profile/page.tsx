'use client'

import React, { useState, Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { UserState } from '@/redux/slice/userSlice'
import RelatedProfile from '@/components/profile/RelatedProfile.server'
import Profile from '@/components/profile/Profile'
import CDUploadImg from '@/components/ui/CDUploadImg'
import CDInputToText from '@/components/ui/CDInputToText'
import ChangePassword from '@/components/profile/ChangePassword'
import ChangeAddress from '@/components/profile/ChangeAddress'
import VerifyEmail from '@/components/profile/VerifyEmail'
import DonationExperiance from '@/components/profile/DonationExperiance'
import DonationStat from '@/components/profile/DonationStat'
import API from '@/api'
import { Check, Pencil } from 'lucide-react'
import { toast } from 'react-toastify';
import RequestDontaion from '@/components/profile/RequestDontaion'

export default function Page() {
    const router = useRouter()
    const reduxUser = useSelector(({ user }: { user: UserState }) => user)
    const [user, setUser] = useState(reduxUser)
    const [edit, setEdit] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const [showVerify, setShowVerify] = useState(false)


    useEffect(() => {
        setUser(reduxUser)
        setLoading(reduxUser.loading)
    }, [reduxUser])


    // Fetch user data / check reduxUser
    useEffect(() => {

        if (loading || reduxUser.loading) return
        if (!reduxUser || !reduxUser?.id) {
            toast.error('User data not found! Redirecting...')
            setTimeout(() => router.replace('/register'), 1500)
        } else {
            setShowVerify(!user.credential?.isVerify)
        }
        setLoading(false)
    }, [reduxUser, router, loading])


    useEffect(() => {
        if (!message) return
        const timer = setTimeout(() => setMessage(null), 3000)
        return () => clearTimeout(timer)
    }, [message])

    // Save profile updates
    const saveUpdate = async () => {
        if (!user?.id) {
            setMessage({ type: 'error', text: 'User ID not found ❌' })
            return
        }

        setSaving(true)
        try {
            // 🧩 Clone first so we don’t mutate original state
            const updateUser = {
                ...user,
                profile: { ...user.profile }
            }

            delete updateUser.profile.img

            const response = await API.user.updateuser(updateUser)

            if (response?.status) {
                toast.success('প্রোফাইল আপডেট হয়েছে ✅')
                setEdit(false)

                // Optionally reload latest user data
                // await reloadUser()
            } else {
                toast.error(response?.error || 'আপডেট ব্যর্থ হয়েছে ❌')
            }
        } catch (err: any) {
            console.error('Error updating profile:', err)
            toast.error('message' in err || 'আপডেট ব্যর্থ হয়েছে ❌')
        }

        setSaving(false)
    }

    if (loading || reduxUser.loading) {
        return <div className="container mx-auto my-5 p-5 text-center">Loading...</div>
    }

    if (!user || !user?.id) return null // Already redirecting in useEffect

    return (
        <div className="container mx-auto my-5 p-5 relative">
            {/* <RequestDontaion user={user} rootEdit={false} /> */}
            <div className="md:flex no-wrap md:-mx-2">
                {/* Left Sidebar */}
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-red-400">
                        <div className="image overflow-hidden relative max-h-80">
                            <CDUploadImg
                                edit={edit}
                                setUser={setUser}
                                user={user}
                            />
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                            <CDInputToText
                                placeholder="Full Name"
                                value={user?.profile?.fullName}
                                edit={edit}
                                name="fullName"
                                onChange={e =>
                                    setUser(prev => ({
                                        ...prev,
                                        profile: { ...prev.profile, fullName: e.target.value },
                                    }))
                                }
                            />
                        </h1>
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">
                            <CDInputToText
                                placeholder="Occupation"
                                value={user?.profile?.occupation}
                                edit={edit}
                                name="occupation"
                                onChange={e =>
                                    setUser(prev => ({
                                        ...prev,
                                        profile: { ...prev.profile, occupation: e.target.value },
                                    }))
                                }
                            />
                        </h3>
                    </div>

                    <div className="my-4"></div>
                    <Suspense fallback={<div>Loading related profiles...</div>}>
                        <RelatedProfile />
                    </Suspense>
                </div>

                {/* Right Content */}


                <div className="tabs tabs-border tabs-lg w-full">
                    <input type="radio" name="my_tabs_6" className="tab" aria-label="Profile" defaultChecked />
                    <div className="tab-content bg-base-100 p-6 w-full">
                        <div className="w-full relative">
                            <div className="flex justify-end w-full top-0 absolute">
                                {edit ? (
                                    <button
                                        disabled={saving}
                                        onClick={saveUpdate}
                                        className={`flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm transition-all ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <Check className="h-3.5 w-3.5" />
                                        <span>{saving ? 'Saving...' : 'Done'}</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm transition-all"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                        <span>Edit Profile</span>
                                    </button>
                                )}
                            </div>

                            <div className="flex justify-center w-full space-x-4 mt-8">
                                {showVerify && <VerifyEmail setShowVerify={setShowVerify} email={user?.profile?.email} />}
                                <DonationStat user={user} rootEdit={false} />

                            </div>

                            <div className="my-4"></div>
                            <Profile user={user} edit={edit} setUser={setUser} />

                            {edit && (
                                <>
                                    <div className="my-4"></div>
                                    <ChangePassword />
                                </>
                            )}

                            <div className="my-4"></div>
                            <ChangeAddress rootEdit={edit} user={user} />

                            <div className="my-4"></div>
                            <DonationExperiance rootEdit={edit} user={user} />
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_6" className="tab" aria-label="Requests"/>
                    <div className="tab-content bg-base-100 p-6 w-full">
                        <div className="w-full relative">
                            <div className=" w-full mt-8  ">
                                <RequestDontaion user={user} rootEdit={false} />
                            </div>
                        </div>
                    </div>

                    {/* <input type="radio" name="my_tabs_6" className="tab" aria-label="Tab 3" />
                    <div className="tab-content bg-base-100 border-base-300 p-6 w-full">Tab content 3</div> */}
                </div>


            </div>

            {/* Global message */}
            {message && (
                <p
                    className={`mt-3 w-full text-center fixed bottom-[60px] text-sm transition-opacity duration-500 ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}
                >
                    {message.text}
                </p>
            )}
        </div>
    )
}
