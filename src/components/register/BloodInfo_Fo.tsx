"use client";
import { useState } from "react";
import Nibondhon from "../client/NibondhonButton";



export default function BloodInfo_Fo() {

    const [bloodGroup, setBloodGroup] = useState("");
    const [weight, setWeight] = useState("");
    const [hasMedicalCondition, setHasMedicalCondition] = useState(false);

    return (
        <section className="max-w-6xl mx-auto  px-12 xl:px-0">
            <div className="lg:w-4/5 w-full">

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                    স্বাস্থ্য সম্পর্কিত তথ্য
                </h1>

                {/* Context */}
                <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                    আপনার শারীরিক তথ্য আমাদেরকে নিরাপদভাবে রক্তদান প্রক্রিয়া পরিচালনা করতে সাহায্য করবে।
                </p>

                {/* Form */}
                <div className="space-y-6">
                    {/* Blood Group */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            রক্তের গ্রুপ
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                        >
                            <option disabled className="text-gray-400" value="">রক্তের গ্রুপ নির্বাচন করুন</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    {/* Weight */}
                    <div className="flex item-center gap-x-4">
                        <div className="w-4/6">
                            <label className="block text-gray-700 font-medium mb-2">
                                আপনার বয়স
                            </label>
                            <input
                                type="number"
                                placeholder="আপনার বয়স কত ?"
                                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <div className="w-2/6">
                            <label className="block text-gray-700 font-medium mb-2">
                                আপনার ওজন
                            </label>
                            <input
                                type="number"
                                placeholder="আপনার ওজন কত ?"
                                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* Medical Condition */}
                    <div className="flex items-center gap-3">

                        {/* <label htmlFor="medicalCondition" className="text-gray-700">
                            কোনো বড় রোগ আছে কি না
                        </label>
                        <label className="toggle text-base-content">
                            <input type="checkbox" className=' border-gray-100' />
                            <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M20 6 9 17l-5-5"></path>
                                </g>
                            </svg>
                            <svg
                                aria-label="disabled"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </label> */}
                        {/* <input
                            type="checkbox"
                            id="medicalCondition"
                            checked={hasMedicalCondition}
                            onChange={(e) => setHasMedicalCondition(e.target.checked)}
                            className="h-5 w-5 checkbox  text-gray-500"
                        /> */}
                    </div>
                </div>

            </div>
            {/* Buttons */}
            <div className="font-bold lg:text-end text-center mt-8 space-x-4">
                 <Nibondhon step={4} />
            </div>
        </section>
    );
} 