import API from '@/api';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

interface SendOtpProps {
    setIsOtpSend: (val: boolean) => void;
}

const SendOtp: React.FC<SendOtpProps> = ({ setIsOtpSend }) => {
    const [forgetError, setForgetError] = useState<{ from: 'local' | 'server'; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const isOtpInsert = /^\d{6}$/.test(otp);
    const isValidPassword = (val: string) => /^.{6,}$/.test(val);

    // 🚀 Toastify for server-side errors
    useEffect(() => {
        if (forgetError?.from === 'server') toast.error(forgetError.message);
    }, [forgetError]);

    // 🧠 Session Check Logic (memoized)
    const checkSession = useCallback(async (): Promise<boolean> => {
        try {
            const res = await API.user.sessionStatus('session_token');
            if (!res?.step || res.step !== 'otp_sent') {
                toast.error('Session expired বা invalid!');
                setIsOtpSend(false);
                return false;
            }
            return true;
        } catch (err: any) {
            toast.error('Session expired, আবার OTP পাঠান');
            setIsOtpSend(false);
            return false;
        }
    }, [setIsOtpSend]);

    // 🕒 Check session every 30s to auto-expire OTP UI
    useEffect(() => {
        checkSession();
        const interval = setInterval(checkSession, 30 * 1000);
        return () => clearInterval(interval);
    }, [checkSession]);

    // 🔁 Resend OTP handler
    const sendAgain = async () => {
        alert("Under Construction")
        // setResendLoading(true);
        // try {
        //     const res = await API.user.sendOtpAgain({ email: 'a********@gmail.com' });
        //     if (res?.error) throw new Error(res.error);
        //     toast.success('✅ OTP আবার পাঠানো হয়েছে');
        // } catch (err: any) {
        //     toast.error(err?.message || 'OTP পাঠানো যায়নি, আবার চেষ্টা করুন');
        // } finally {
        //     setResendLoading(false);
        // }//note
    };

    // 🔑 Change password handler
    const handleChangePassword = async () => {
        setForgetError(null);

        if (!isValidPassword(newPassword)) {
            setForgetError({ from: 'local', message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে 🔒' });
            return;
        }

        // ✅ session pre-check before API call
        const isSessionValid = await checkSession();
        if (!isSessionValid) return;

        setLoading(true);
        try {
            const res = await API.user.changePasswordWithOtp({ otp, newPassword });

            if (res?.error) throw new Error(res.error);

            toast.success('✅ পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!');
            setOtp('');
            setNewPassword('');
            setIsOtpSend(false);
        } catch (err: any) {
            setForgetError({ from: 'server', message: err?.message || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে' });
            if (err.message === "যাচাইকরণ প্রক্রিয়াটি পুনরায় চেষ্টা করুন ") {
                setIsOtpSend(false);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-4 mt-4 w-full">
            {/* 🔑 Password Field */}
            <div className="mb-12">
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="নতুন পাসওয়ার্ড দিন"
                    className={`w-full border rounded-xl p-3 text-lg focus:outline-none focus:ring-2 transition ${forgetError?.from === 'local'
                        ? 'focus:ring-red-400 border-red-300'
                        : 'focus:ring-gray-400 border-gray-300'
                        }`}
                />
                {forgetError?.from === 'local' && (
                    <p className="text-red-500 text-sm mt-1">{forgetError.message}</p>
                )}
            </div>

            {/* 📩 OTP Field */}
            <div className="text-start">
                <div className="text-gray-500 mb-8">
                    <span className="font-bold text-black">a********@gmail.com</span> ঠিকানায় একটি ৬ সংখ্যার কোড পাঠানো হয়েছে ✅{' '}
                    <span
                        onClick={!resendLoading ? sendAgain : undefined}
                        className={`mx-1 ${resendLoading ? 'text-gray-400 cursor-not-allowed' : 'hover:text-blue-600 underline cursor-pointer'
                            } text-sm`}
                    >
                        {resendLoading ? 'অপেক্ষা করুন...' : 'আবার পাঠান'}
                    </span>
                </div>

                <div className="w-full flex gap-x-4 my-4">
                    <input
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && isOtpInsert) handleChangePassword();
                        }}
                        type="text"
                        placeholder="৬ সংখ্যার OTP দিন"
                        className="border w-1/3 border-gray-300 rounded-xl px-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-center tracking-widest"
                    />

                    <button
                        type="button"
                        disabled={!isOtpInsert || loading || resendLoading}
                        onClick={handleChangePassword}
                        className={`bg-red-500 rounded-xl text-white transition w-2/3 py-2 font-semibold ${loading || resendLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-400'
                            }`}
                    >
                        {loading ? 'লোড হচ্ছে...' : 'পরিবর্তন করুন'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SendOtp;
