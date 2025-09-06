'use client'
import { RegisterState, updatePhoneNumber, prevStep } from '@/redux/slice/registerSlice';
import { PencilIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


export default function Varification_Last() {
  
  const { step5 } = useSelector(({ register }: { register: RegisterState }) => register)
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [otpPhoneNumber, setOtpPhoneNumber] = useState(step5.phoneNumber);
  const [edit, setEdit] = useState(true);
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (!otp) {
      setError("অবশ্যই OTP লিখতে হবে");
      return;
    }


    setError(null);


  };
  const setPhone = () => {
    dispatch(updatePhoneNumber(otpPhoneNumber))
    setEdit(false)
  }

  return (
    <section className="max-w-6xl mx-auto px-12 xl:px-0">
      <div className="lg:w-4/5 w-full">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          আপনার ফোন নাম্বারে পাঠানো OTP লিখুন
        </h1>

        {/* Context */}
        <p className="text-lg mb-6 text-gray-600 leading-relaxed">
          আমরা আপনার প্রদত্ত নাম্বার{" "}
          <span className="font-bold mx-2 text-gray-900">
            {edit ? (
              <span className="join my-2 md:my-0">
                <input
                  type="text"
                  value={otpPhoneNumber}
                  onChange={(e) => setOtpPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="w-46 input-sm join-item z-20 border rounded-r-none text-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button
                  onClick={() => setPhone()}
                  className="btn btn-neutral z-10 join-item"
                >
                  ওটিপি পাঠান
                </button>
              </span>
            ) : (
              <span className="text-2xl">
                {otpPhoneNumber}{" "}
                <span className="tooltip" data-tip="Edit Number">
                  <PencilIcon
                    onClick={() => setEdit(true)}
                    className="inline w-4 cursor-pointer pb-1"
                  />
                </span>
              </span>
            )}
          </span>{" "}
          এ একটি OTP পাঠিয়েছি।
        </p>

        <p className="text-lg mb-8 text-gray-600 leading-relaxed">
          আপনার অ্যাকাউন্টের সুরক্ষা নিশ্চিত করতে সঠিক OTP প্রবেশ করুন।
        </p>
      </div>
      <button
        onClick={() => dispatch(prevStep())}
        className="btn rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
      >
        পূর্বে
      </button>
      {/* OTP Input */}
      {!edit && (
        <div className="lg:text-end text-center mt-8">
          <input
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
              setOtp(val);
            }}
            placeholder="OTP লিখুন"
            className="w-46 text-center text-3xl tracking-[20px] ps-6 placeholder:tracking-normal border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-6 space-x-4">
            <button
              onClick={() => console.log("Resend OTP")}
              className="btn btn-ghost rounded-xl   transition"
            >
              Resend OTP
            </button>
            <button
              onClick={handleSubmit}
              className="bg-red-500 btn rounded-xl text-white hover:bg-red-400 transition"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
