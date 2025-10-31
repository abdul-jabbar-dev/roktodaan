import API from '@/api';
import React, { useEffect, useState } from 'react';
import SendOtp from './SendOtp';
import { toast } from 'react-toastify';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const ForgetPass = ({ showForgetPassword, setShowForgetPassword }: { showForgetPassword: boolean, setShowForgetPassword: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [forgetError, setForgetError] = useState<{ from: 'local' | 'server', message: string } | null>(null)
    const [forgetEmail, setForgetEmail] = useState("")
    const [isOtpSend, setIsOtpSend] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (forgetError?.from === 'server') toast.error(forgetError.message);
    }, [forgetError])


    const forgetPasswordEvent = async () => {

        if (loading) return
        setIsOtpSend(false)
        setLoading(true)

        if (!forgetEmail && showForgetPassword) {
            setForgetError({ from: 'local', message: "অবশ্যই ইমেইল লিখুন" })

            setLoading(false)
            return
        }
        if (!emailRegex.test(forgetEmail) || !forgetEmail && showForgetPassword) {
            setForgetError({ from: 'local', message: "অবশ্যই সঠিক ইমেইল লিখুন" })

            setLoading(false)
            return
        }
        setForgetError(null)
        try {
            const data = await API.user.forgetPasswod(forgetEmail)

            if (data.error) {
                throw (data.error)
            }
            if (data?.data.session_token) {
                setIsOtpSend(true)

            } else {
                setForgetError({ from: 'server', message: data?.error || "এই ইমেইলে কোনো একাউন্ট খুঁজে পাওয়া যায়নি" })
                setLoading(false)
                return
            }
            setForgetEmail("")
            setLoading(false)
        } catch (err: any) {
            let errorTxt = err?.msg || err.message || err || "কোড পাঠাতে সমস্যা হয়েছে, পরে আবার চেষ্টা করুন"
            if (errorTxt === "No User Found!") errorTxt = "এই ইমেইলে কোনো একাউন্ট খুঁজে পাওয়া যায়নি"
            setForgetError({ from: 'server', message: errorTxt })
        }
        setLoading(false)
    }
    return (<>{
        isOtpSend ? <>
            <SendOtp setIsOtpSend={setIsOtpSend} />
        </> :
            <div className="flex flex-col space-y-4 mt-4 w-full">
                <input
                    type="email"
                    value={forgetEmail}
                    onChange={(e) => setForgetEmail(e.target.value)}
                    placeholder="ইমেইল লিখুন"
                    className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                {forgetError && <p className="text-red-500 text-sm">{forgetError.message}</p>}
                <button
                    onClick={() => forgetPasswordEvent()}
                    className="bg-red-500 btn rounded-xl text-white hover:bg-red-400 transition"
                >
                    {loading ? "লোডিং..." : "  কোড পাঠান "}
                </button>
            </div>}
    </>)


}

export default ForgetPass;
