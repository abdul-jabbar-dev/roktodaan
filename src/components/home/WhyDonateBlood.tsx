"use client";
import React from 'react'
import { Heart, Droplet, ShieldCheck, Users } from "lucide-react";
export default function WhyDonateBlood() {
 const reasons = [
    {
      icon: <Droplet className="w-10 h-10 text-red-600" />,
      title: "এক ফোঁটা রক্ত = এক প্রাণের জীবন",
      desc: "আপনার দেওয়া রক্ত একজন রোগীর জীবনে নতুন আশা এনে দিতে পারে।",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-red-600" />,
      title: "রক্ত মজুদ হয় না",
      desc: "রক্ত অনেকক্ষণ সংরক্ষণ করা যায় না, তাই নিয়মিত দাতাই আসল ভরসা।",
    },
    {
      icon: <Heart className="w-10 h-10 text-red-600" />,
      title: "রক্তদান মানেই স্বাস্থ্য সুরক্ষা",
      desc: "নিয়মিত রক্তদান করলে শরীর নতুন রক্ত তৈরি করে, ফলে শরীর থাকে সুস্থ।",
    },
    {
      icon: <Users className="w-10 h-10 text-red-600" />,
      title: "মানবতার সেরা দান",
      desc: "ধর্ম, বর্ণ, দেশ– সবকিছুর ঊর্ধ্বে গিয়ে রক্তই মানুষকে মানুষে যুক্ত করে।",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          কেন রক্তদান করবেন?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-sm">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}