
import React, { useState } from 'react'
import Nibondhon from '../client/NibondhonButton'
export default function LastDonation_Th() {
    const [lastDonation, setLastDonation] = useState({ date: '', location: '' })
    return (
        <section className="max-w-6xl mx-auto px-12 xl:px-0">
            <div className="lg:w-4/5 w-full">

                {/* Title */}
                <h1 className="text-4xl md:text-6xl  font-bold text-gray-800 mb-6">
                    আপনার সর্বশেষ রক্তদানের তথ্য দিন
                </h1>

                {/* Context */}
                <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                    এটি আমাদেরকে আপনার রক্তদানের ফ্রিকোয়েন্সি বুঝতে সাহায্য করবে এবং আপনার
                    শরীরের জন্য নিরাপদ সময়সীমা নিশ্চিত করবে।
                </p>

                {/* Form */}
                <div className=" flex w-full space-x-4 md:space-y-0 space-y-4 flex-col  md:flex-row">
                    <div className='w-full'>
                        <label className="block text-gray-700 font-medium mb-2">
                            সর্বশেষ রক্তদানের তারিখ
                        </label>
                        <input
                            onChange={(e) => setLastDonation({ ...lastDonation, date: e.target.value })}
                            type="date"
                            required
                            className="w-full required  border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div className='w-full'>
                        <label className="block text-gray-700 font-medium mb-2">
                            রক্তদানের স্থান
                        </label>
                        <input
                            type="text" required
                            onChange={(e) => setLastDonation({ ...lastDonation, location: e.target.value })}
                            placeholder="যেমনঃ Dhaka Medical College"
                            className="w-full required  border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                </div>

            </div>
            {/* Buttons */}
            <div className="font-bold lg:text-end text-center mt-8 space-x-4">
                <Nibondhon step={3} />
                {/* <button onClick={() => console.log(lastDonation)}>d</button> */}
            </div>
        </form>
    )
}
