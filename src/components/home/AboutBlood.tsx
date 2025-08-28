import { AlertCircle, Droplets, Link } from 'lucide-react';
import React from 'react'

export default function AboutBlood() {
    const info = [
        {
            icon: <Droplets className="w-10 h-10 text-red-600" />,
            title: "রক্তের গ্রুপ",
            desc: "মানুষের রক্ত প্রধানত ৮ ধরনের: A+, A-, B+, B-, AB+, AB-, O+, O-।",
        },
        {
            icon: <Link className="w-10 h-10 text-red-600" />,
            title: "কে কাকে দিতে পারে?",
            desc: "O- সবাইকে দিতে পারে (Universal Donor), আর AB+ সবার কাছ থেকে নিতে পারে (Universal Recipient)।",
        },
        {
            icon: <AlertCircle className="w-10 h-10 text-red-600" />,
            title: "কেন জানা জরুরি?",
            desc: "জরুরি সময়ে সঠিক রক্তগ্রুপ জানা থাকলে জীবন বাঁচানো সহজ হয়।",
        },
    ];

    return (
        <section className="py-28 bg-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-20 text-gray-800">
                    রক্ত সম্পর্কে জানুন
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {info.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex justify-center mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Extra info block */}
                <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-xl text-left">
                    <h3 className="text-2xl font-bold mb-4 text-red-800">রক্তের গ্রুপ সামঞ্জস্য চার্ট</h3>
                    <p className="text-gray-600">
                        <span className="font-semibold">O-</span> ➝ সবার জন্য দিতে পারে, <br />
                        <span className="font-semibold">AB+</span> ➝ সবার কাছ থেকে নিতে পারে, <br />
                        অন্য গ্রুপগুলো তাদের নিজেদের সাথে বা সামঞ্জস্যপূর্ণ গ্রুপের সাথেই দেওয়া-নেওয়া সম্ভব।
                    </p>
                </div>
            </div>
        </section>
    );
} 
