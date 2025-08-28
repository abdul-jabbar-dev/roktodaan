"use client"

import { Syringe, User, HeartPulse } from "lucide-react"
 

export default function RegisterPage() {
    return (
        <div className="bg-white text-gray-800">

            {/* ✅ Hero Section */}
            <section className="py-28  bg-red-50">

                <div className="max-w-6xl mx-auto">
                    <div className="w-4/5">
                        <h1 className="text-6xl font-bold text-gray-800 mb-6">রক্ত দিন, জীবন বাঁচান</h1>
                        <p className=" text-lg mb-8 text-gray-600">
                            প্রতিদিন অসংখ্য মানুষ দুর্ঘটনা, অপারেশন বা দীর্ঘমেয়াদী রোগে আক্রান্ত হয়ে রক্তের জন্য অপেক্ষা করে।
                            আপনার একটি সিদ্ধান্ত কারও জীবনে নতুন আশার আলো আনতে পারে।
                        </p>
                        <p className=" text-lg mb-8 text-gray-600">
                            মাত্র ১০ মিনিট সময় নিয়ে আপনি একজন মানুষের পুরো জীবন বাঁচাতে পারেন।
                            রক্তদান শুধু দানের কাজ নয়, এটি মানবতার সর্বোচ্চ দায়িত্ব।
                        </p>
                        <p className=" text-lg mb-8 text-gray-600">
                            নিয়মিত রক্তদান করলে শুধু রোগীরা উপকৃত হয় না,
                            বরং আপনার শরীরও নতুন রক্তকণিকা তৈরির মাধ্যমে সুস্থ থাকে।
                        </p>
                    </div>
                    <div className="font-bold text-end">
                        <span className="text-gray-600">স্বেচ্ছাসেবক হিসেবে</span> &nbsp;
                        <button className="bg-red-500 btn rounded-xl  text-white hover:bg-red-400">
                            নিবন্ধন করুন →
                        </button>
                    </div>
                </div>

            </section>

            {/* ✅ Why Blood Donation */}
  <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-gray-700 space-y-12">

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          বিশ্বব্যাপী রক্তের অভাবের প্রভাব
        </h2>

        {/* Intro Paragraph */}
        <p className="text-lg leading-relaxed text-center">
          রক্তের অভাবে বিশ্বের প্রতিদিন লক্ষাধিক মানুষ মারা যাচ্ছে। এটি মাতৃমৃত্যু, দুর্ঘটনা ও শিশুদের স্বাস্থ্যের ক্ষেত্রে বিশেষভাবে প্রযোজ্য।  
          আপনার একটি রক্তদান একাধিক জীবন বাঁচাতে পারে।
        </p>

        {/* Stats List */}
        <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
          <p className="flex items-start gap-3">
            <User className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            প্রতি বছর প্রায় ৫৩০,০০০ নারী মারা যান গর্ভাবস্থা বা প্রসবের সময়, যার প্রায় ২৫% মৃত্যু হয় অতিরিক্ত রক্তক্ষরণের কারণে।
          </p>
          <p className="flex items-start gap-3">
            <HeartPulse className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            প্রতি বছর প্রায় ৫ মিলিয়ন মানুষ দুর্ঘটনা বা আঘাতজনিত কারণে মারা যান, এবং অনেকের মৃত্যু ঘটে রক্তের অভাবে।
          </p>
          <p className="flex items-start gap-3">
            <Syringe className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            উন্নয়নশীল দেশে শিশুদের মধ্যে অ্যানিমিয়া এবং অন্যান্য রক্তসংক্রান্ত রোগের কারণে মৃত্যুহার বেশি।
          </p>
        </div>

        {/* Conclusion */}
        <p className="text-lg text-center mt-6">
          রক্তদান করলে শুধু একজন নয়, একাধিক মানুষের জীবন বাঁচানো সম্ভব।  
          তাই আজই স্বেচ্ছাসেবক হিসেবে রক্তদানে অংশ নিন!
        </p>
      </div>
    </section>
            {/* ✅ Extended Info Section */}
            <section className="py-20 bg-red-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">রক্তদানের গুরুত্ব</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-10">
                        বাংলাদেশে প্রতিদিন প্রায় <span className="font-semibold">৮০০–১০০০ ইউনিট</span> রক্তের প্রয়োজন হয়।
                        থ্যালাসেমিয়া, হিমোফিলিয়া, লিউকেমিয়া রোগী এবং দুর্ঘটনায় আহত ব্যক্তিদের জীবন বাঁচাতে
                        নিয়মিত রক্তদাতাদের ভূমিকা অত্যন্ত গুরুত্বপূর্ণ।
                        <br /><br />
                        অনেক সময় রোগীরা পর্যাপ্ত রক্ত না পেয়ে জীবন ঝুঁকিতে পড়ে।
                        আপনার একবারের রক্তদান সেই সংকট দূর করতে পারে।
                    </p>
                </div>
            </section>

            {/* ✅ Steps Section */}
            <section className="py-16 container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">কিভাবে রক্তদান করবেন?</h2>
                <div className="space-y-8 max-w-2xl mx-auto">
                    <div className="flex items-start gap-4 item-center">
                        <div className="bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center  font-bold">1</div>
                        <p className="text-gray-600">স্বেচ্ছাসেবক হিসেবে নিবন্ধন করুন এবং আপনার তথ্য প্রদান করুন।</p>
                    </div>
                    <div className="flex items-start gap-4 item-center">
                        <div className="bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center  font-bold">2</div>
                        <p className="text-gray-600">প্রাথমিক স্বাস্থ্য পরীক্ষা ও রক্তচাপ পরিমাপ করা হবে।</p>
                    </div>
                    <div className="flex items-start gap-4 item-center">
                        <div className="bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center  font-bold">3</div>
                        <p className="text-gray-600">রক্তদান সম্পন্ন করুন এবং একটি জীবন বাঁচান।</p>
                    </div>
                </div>
            </section>

            {/* ✅ Bottom CTA */}
            <section className="py-16 text-center  ">
                <h2 className="text-2xl font-bold mb-6">আপনার একটি পদক্ষেপ হতে পারে অন্যের জীবনের শেষ ভরসা</h2>
                <button className="  text-gray-600 font-semibold  ">
                    এখনই রক্তদাতা হোন →
                </button>
            </section>
        </div>
    )
}
