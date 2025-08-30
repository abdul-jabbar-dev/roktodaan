"use client"

import Effect from "@/components/register/Effect"
import HeroResigser from "@/components/register/HeroRegister"
import ImportenceOfDonation from "@/components/register/ImportenceOfDonation"



export default function RegisterPage() {
    return (
        <div className="bg-white text-gray-800">

            {/* ✅ Hero Section */}
            <HeroResigser />

            {/* ✅ Why Blood Donation */}
            <Effect />
            {/* ✅ Extended Info Section */}
            <ImportenceOfDonation />

            {/* ✅ Steps Section */}

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
