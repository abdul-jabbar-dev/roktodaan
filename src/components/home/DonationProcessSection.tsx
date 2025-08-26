'use client'
import React from 'react';
import { Droplet, User, Hospital, Package, Heart } from 'lucide-react';

const bloodDonationSteps = [
    {
        id: 1,
        icon: "🧑‍🤝‍🧑",
        title: "Donor Contact & Registration",
        description:
            "Donor hospital বা blood bank এ contact করে appointment fix করে, personal details এবং medical history submit করে, health questionnaire fill-up করে এবং basic health check-up (BP, hemoglobin, temperature) সম্পন্ন করে।",
    },
    {
        id: 2,
        icon: "🩸",
        title: "Blood Collection from Donor",
        description:
            "Donor comfortable position এ বসানো হয়। Sterile needle ব্যবহার করে collection bag এ 450ml ±10% রক্ত নেওয়া হয়। Nurse donor monitor করে, dizziness বা discomfort হলে দ্রুত ব্যবস্থা নেওয়া হয়। Collection শেষে donor কে rest এবং refreshments দেওয়া হয়।",
    },
    {
        id: 3,
        icon: "🏥",
        title: "Testing & Compatibility Check",
        description:
            "Donor রক্ত পরীক্ষা করা হয় infectious disease (HIV, Hepatitis B & C, Syphilis), blood group ও Rh factor, এবং cross-match test করে donor ও receiver এর compatibility নিশ্চিত করা হয়।",
    },
    {
        id: 4,
        icon: "📦",
        title: "Storage & Preparation",
        description:
            "Compatible রক্ত temperature controlled refrigerator/freezer এ রাখা হয়। RBC, Plasma, Platelets আলাদা করা হয় এবং proper labeling ও inventory tracking নিশ্চিত করা হয়।",
    },
    {
        id: 5,
        icon: "❤️",
        title: "Transfusion to Receiver",
        description:
            "Matched রক্ত sterile IV drip setup এর মাধ্যমে patient কে transfuse করা হয়। Transfusion চলাকালীন patient monitor করা হয় এবং complete হওয়ার পর short observation period এ রাখা হয়। Medical record update করা হয়।",
    },
];


export default function DonationProcessSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                    🩸 রক্তদান প্রক্রিয়া
                </h2>
                রক্তদান একটি সহজ প্রক্রিয়া। সম্পূর্ণ রক্তদানের জন্য সম্পূর্ণ প্রক্রিয়াটি প্রায় ৪৫ মিনিট এবং অ্যাফেরেসিস দানের জন্য ৯০ মিনিট পর্যন্ত সময় লাগে।
                 
            </div>
        </section>
    );
}
