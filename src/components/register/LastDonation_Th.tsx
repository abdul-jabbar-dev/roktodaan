
import React, { useState, useEffect } from 'react'
import Nibondhon from '../client/NibondhonButton'
import { ValidationLastDonationType } from '@/validation/register/lastDonation';
export default function LastDonation_Th() {
    const [lastDonation, setLastDonation] = useState({
        lastDonationDate: "",
        lastDonationLocation: ""
    });
    const [error, setError] = useState<ValidationLastDonationType | undefined>(undefined);
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <section className="max-w-6xl mx-auto px-12 xl:px-0">
            <div className="lg:w-4/5 w-full">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                    আপনার সর্বশেষ রক্তদানের তথ্য দিন
                </h1>

                <div className="flex w-full space-x-4 md:space-y-0 space-y-4 flex-col md:flex-row">
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-2">
                            সর্বশেষ রক্তদানের তারিখ
                        </label>
                        <input
                            value={lastDonation.lastDonationDate}
                            onChange={(e) =>
                                setLastDonation({ ...lastDonation, lastDonationDate: e.target.value })
                            }
                            type="date"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {(error as ValidationLastDonationType)?.errors?.lastDonationDate && (
                            <p className="text-red-500 text-sm">{(error as ValidationLastDonationType).errors?.lastDonationDate?._errors[0]}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-2">
                            রক্তদানের স্থান
                        </label>
                        <input
                            value={lastDonation.lastDonationLocation}
                            onChange={(e) =>
                                setLastDonation({ ...lastDonation, lastDonationLocation: e.target.value })
                            }
                            type="text"
                            placeholder="যেমনঃ Dhaka Medical College"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {(error as ValidationLastDonationType)?.errors?.lastDonationLocation && (
                            <p className="text-red-500 text-sm">{(error as ValidationLastDonationType).errors?.lastDonationLocation?._errors[0]}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="font-bold lg:text-end text-center mt-8 space-x-4">
                <Nibondhon
                    step={3}
                    state={{ ...lastDonation, experience: true }}
                    setError={setError}
                />
            </div>
        </section>
    );
}
