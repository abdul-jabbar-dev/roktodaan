'use client'
import API from '@/api'
import URLS from '@/config';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUserDataFetch } from '@/redux/slice/userSlice';

export default function LoginStep({ setVewLoginComp }: { setVewLoginComp: Dispatch<SetStateAction<boolean>> }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    if (!email || !password) {
      setError("অবশ্যই সব তথ্য পূরণ করতে হবে")
      setLoading(false)
      return
    }

    try {
      const data = await API.user.login(email, password)
      if (!data?.data?.token || !data.status) {
        setError("ইমেইল বা পাসওয়ার্ড ভুল")
        setLoading(false)
        return
      }
      const localData = {
        token: data.data.token,
        user: {
          id: data.data.user.id,
          fullName: data.data.user.profile.fullName,
          phoneNumber: data.data.user.profile.phoneNumber,
          email: data.data.user.profile.email,
          bloodGroup: data.data.user.profile.bloodGroup
        },
        fetchedAt: Date.now()
      };
      dispatch(setUserDataFetch(data.user));
      localStorage.setItem(URLS.LOCAL_STORE.SET_USER, JSON.stringify(localData));

    } catch (err) {
      console.error(err)
      setError("Login failed, please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-12 xl:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side - Description */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Donor Login
          </h1>
          <p className="text-lg mb-6 text-gray-600 leading-relaxed">
            আপনার donor একাউন্টে লগইন করার মাধ্যমে আপনি রক্তদানের তথ্য update করতে পারবেন,
            অন্যান্য donor দের সাথে connect করতে পারবেন এবং রক্তের জরুরি প্রয়োজন শেয়ার করতে পারবেন।
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            যদি আপনার donor একাউন্ট না থাকে, তবে সহজেই নতুন volunteer হিসেবে নিবন্ধন করতে পারেন।
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:text-end text-center">
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ইমেইল লিখুন"
              className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="পাসওয়ার্ড লিখুন"
              className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-red-500 btn rounded-xl text-white hover:bg-red-400 transition"
            >
              {loading ? "Logging in..." : "লগইন"}
            </button>

            {/* Extra Options */}
            <div className="flex flex-col items-center space-y-2 mt-4">
              <button className="btn btn-ghost rounded-xl text-gray-600 hover:text-gray-800 transition">
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
              <button
                onClick={() => setVewLoginComp(e => !e)}
                className="btn btn-outline rounded-xl border-red-400 text-red-500 hover:bg-red-50"
              >
                নতুন Volunteer হিসেবে নিবন্ধন করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
