import React from 'react'
import { Syringe, User, HeartPulse } from "lucide-react"
export default function Effect() {
  return (
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
  )
}
