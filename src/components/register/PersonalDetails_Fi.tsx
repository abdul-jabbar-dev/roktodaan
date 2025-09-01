
"use client"
import React, { useState, useEffect } from 'react'
import Nibondhon from '../client/NibondhonButton'
import { Division, District, Upazila } from '@/types/location/destination';
import { ValidationPersonalInfoType } from '@/validation/register/personalInfo';
export default function PersonalDetails_Fi() {

    const [personalInfoError, setPersonalInfoError] = useState<ValidationPersonalInfoType>()
    const [selectedDivision, setSelectedDivision] = useState<{ id: number, name: string } | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<{ id: number, name: string } | null>(null);
    const [selectedUpazila, setSelectedUpazila] = useState<{ id: number, name: string } | null>(null);
    const [personalInfo, setPersonalInfo] = useState<{ fullName: string, email?: string, phoneNumber: string, gender: 'Male' | 'Female' }>
        ({ fullName: "", phoneNumber: "", gender: 'Male' })

    const [division, setDivision] = useState<Division[]>([]);
    const [district, setDistrict] = useState<District[]>([]);
    const [upazila, setUpazila] = useState<Upazila[]>([]);
    useEffect(() => {
        fetch('/api/location/division.json')
            .then(res => res.json())
            .then(data => setDivision(data));

        fetch('/api/location/districts.json')
            .then(res => res.json())
            .then(data => setDistrict(data));

        fetch('/api/location/upazila.json')
            .then(res => res.json())
            .then(data => setUpazila(data));


    }, []);

    useEffect(() => {

        console.log(personalInfoError)
    }, [personalInfoError]);
    return (
        <section className="max-w-6xl mx-auto  px-12 xl:px-0">
            <div className="lg:w-4/5 w-full">

                {/* Title */}
                <h1 className="text-4xl md:text-6xl  font-bold text-gray-800 mb-6">
                    আপনার ব্যক্তিগত তথ্য দিন
                </h1>

                {/* Context */}
                <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                    এটি আমাদেরকে আপনার রক্তদানের ফ্রিকোয়েন্সি বুঝতে সাহায্য করবে এবং আপনার
                    শরীরের জন্য নিরাপদ সময়সীমা নিশ্চিত করবে।
                </p>

                {/* Form */}
                <div className=" flex w-full space-x-4 space-y-4 flex-col">
                    <div className="flex w-full space-x-4 md:space-y-0 space-y-4 flex-col  md:flex-row">
                        <div className='w-full'>
                            <label className="block text-gray-700 font-medium mb-2">
                                নাম <sup className="text-xs text-neutral">*</sup>
                            </label>
                            <input
                                onChange={e => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                                placeholder='আপনার সম্পূর্ণ নাম' required
                                type="text"
                                className="w-full validator border border-gray-300 rounded-xl px-3 py-[10px] focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            {(personalInfoError as ValidationPersonalInfoType)?.errors?.fullName && (
                                <p className="text-red-500 text-sm">{(personalInfoError as ValidationPersonalInfoType)?.errors?.fullName?._errors[0]}</p>
                            )}
                        </div>
                        <div className='w-full'>
                            <label className="block text-gray-700 font-medium mb-2">
                                ইমেল

                            </label>
                            <input
                                onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                placeholder='আপনার ইমেল'
                                type="text"
                                className="w-full border border-gray-300 rounded-xl px-3 py-[10px] focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            {(personalInfoError as ValidationPersonalInfoType)?.errors?.email && (
                                <p className="text-red-500 text-sm">{(personalInfoError as ValidationPersonalInfoType)?.errors?.email?._errors[0]}</p>
                            )}
                        </div>
                    </div>
                    <div className='w-full flex gap-x-2'>
                        <div className='w-9/12'>
                            <label className="block text-gray-700 font-medium mb-2">
                                ফোন নম্বর <sup className="text-xs text-neutral">*</sup>
                            </label>
                            <input
                                type="number"
                                onChange={e => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
                                placeholder="01*********" required
                                className="w-full validator border border-gray-300 rounded-xl px-3 py-[10px] focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            {(personalInfoError as ValidationPersonalInfoType)?.errors?.phoneNumber && (
                                <p className="text-red-500 text-sm">{(personalInfoError as ValidationPersonalInfoType)?.errors?.phoneNumber?._errors[0]}</p>
                            )}
                        </div>
                        <div className='w-3/12'>
                            <label className="block text-gray-700 font-medium mb-2">জেন্ডার <sup className="text-xs text-neutral">*</sup></label>
                            <select
                                value={personalInfo.gender}
                                className="select border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400  bg-transparent"
                                onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value as 'Male' | 'Female' })}
                            >
                                <option value="Male"  >জনাব</option>
                                <option value="Female" >জনাবা</option>

                            </select>
                            {(personalInfoError as ValidationPersonalInfoType)?.errors?.gender && (
                                <p className="text-red-500 text-sm">{(personalInfoError as ValidationPersonalInfoType)?.errors?.gender?._errors[0]}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="lg:w-4/5 w-full">

                {/* Title */}
                <h1 className="text-4xl md:text-2xl  font-bold text-gray-800 mb-6">
                    আপনার ঠিকানা

                </h1>

                {/* Context */}
                <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                    রক্তদানের জন্য প্রয়োজনে যাতে সহজে যোগাযোগ করা যায়, সেজন্য আপনার বর্তমান ঠিকানা লিখুন (যেমন: জেলা, এলাকা নাম)।
                </p>

                {/* Form */}
                <div className=" flex w-full space-x-4 md:space-y-0 space-y-4 flex-col  md:flex-row">
                    <div className='w-full'>
                        <label className="block text-gray-700 font-medium mb-2">বিভাগ <sup className="text-xs text-neutral">*</sup></label>
                        <select
                            value={selectedDivision?.id ?? ""}
                            className="select border border-gray-300 w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400  bg-transparent"
                            onChange={(e) => {
                                const id = Number(e.target.value);
                                const divi = division.find(d => d.id === id);
                                if (divi) {
                                    setSelectedDivision({ id: divi.id, name: divi.bn_name });
                                    setSelectedDistrict(null);
                                    setSelectedUpazila(null);
                                }
                            }}
                        >
                            <option value="" disabled>বিভাগ নির্বাচন করুন</option>
                            {division.map(divi => (
                                <option key={divi.id} value={divi.id}>{divi.bn_name}</option>
                            ))}
                        </select>
                        {(personalInfoError as ValidationPersonalInfoType)?.errors?.address?.division && (
                            <p className="text-red-500 text-sm">{(personalInfoError as ValidationPersonalInfoType)?.errors?.address?.division?._errors[0]}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-2">জেলা <sup className="text-xs text-neutral">*</sup></label>
                        <select
                            value={selectedDistrict?.id ?? ""}
                            className="select border w-full border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400  bg-transparent"
                            disabled={!selectedDivision}
                            onChange={(e) => {
                                const id = Number(e.target.value);
                                const dist = district.find(d => d.id === id);
                                if (dist) {
                                    setSelectedDistrict({ id: dist.id, name: dist.bn_name });
                                    setSelectedUpazila(null);
                                }
                            }}
                        >
                            <option value="" disabled>জেলা নির্বাচন করুন</option>
                            {district
                                .filter(d => d.division_id === selectedDivision?.id)
                                .map(d => (
                                    <option key={d.id} value={d.id}>{d.bn_name}</option>
                                ))}
                        </select>
                        {(personalInfoError as ValidationPersonalInfoType)?.errors?.address?.district && (
                            <p className="text-red-500 text-sm">{(personalInfoError as ValidationPersonalInfoType)?.errors?.address?.district?._errors[0]}</p>
                        )}
                    </div>



                    <div className='w-full'>
                        <span className="w-full flex flex-col ">
                            <label className="block text-gray-700 font-medium mb-2">উপজেলা <sup className="text-xs text-neutral">*</sup></label>
                            <select
                                value={selectedUpazila?.id ?? ""}
                                className=" w-full select border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400  bg-transparent"
                                disabled={!selectedDistrict}
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    const upz = upazila.find(u => u.id === id);
                                    if (upz) {
                                        setSelectedUpazila({ id: upz.id, name: upz.bn_name });
                                    }
                                }}
                            >
                                <option value="" disabled>উপজেলা নির্বাচন করুন</option>
                                {upazila
                                    .filter(u => u.district_id === selectedDistrict?.id)
                                    .map(u => (
                                        <option key={u.id} value={u.id}>{u.bn_name}</option>
                                    ))}
                            </select>
                            {(personalInfoError as ValidationPersonalInfoType)?.errors?.address?.upazila && (
                                <p className="text-red-500 text-sm">{(personalInfoError as ValidationPersonalInfoType)?.errors?.address?.upazila?._errors[0]}</p>
                            )}
                        </span>
                    </div>
                </div>


            </div>
            {/* Buttons */}
            <div className="font-bold lg:text-end text-center mt-8 space-x-4">

                <Nibondhon step={5}
                    state={{
                        ...personalInfo,
                        address:
                            { district: selectedDistrict?.name!, division: selectedDivision?.name!, upazila: selectedUpazila?.name! }
                    }} setError={setPersonalInfoError} />
            </div>
        </section>
    )
}
