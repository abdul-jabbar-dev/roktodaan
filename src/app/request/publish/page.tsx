'use client'
import LoadingAnimation from '@/components/LoadingAnimation';
import { useLocationSelect } from '@/hooks/useLocationSelect';
import { usePublishRequestMutation } from '@/redux/services/request';
import BloodGroup, { EBloodGroup } from '@/types/blood/group';
import { Donation, DonationStatus, RequestStatus, DonationType } from '@/types/request/type';
import { mapBloodGroupLebelToEnum } from '@/utils/BloodGroupFormet';
import React, { useState, useEffect } from 'react';



const BloodBagIcon: React.FC<{ className?: string; isSelected: boolean; onClick: () => void; }> = ({ className, isSelected, onClick }) => (
    <svg
        className={`${className} cursor-pointer transition-colors duration-300`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        aria-selected={isSelected}
        role="button"
    >
        <path
            d="M12 3.5C6.5 3.5 4 6 4 10V17C4 20 6.5 22.5 12 22.5C17.5 22.5 20 20 20 17V10C20 6 17.5 3.5 12 3.5Z"
            className={isSelected ? 'fill-red-500' : 'fill-red-200'}
        />
        <path
            d="M12 18V22.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9 2H15"
            stroke={isSelected ? 'rgb(239 68 68)' : 'rgb(254 202 202)'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 2V3.5"
            stroke={isSelected ? 'rgb(239 68 68)' : 'rgb(254 202 202)'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 7.5C11.1716 7.5 10.5 8.17157 10.5 9V11C10.5 11.8284 11.1716 12.5 12 12.5C12.8284 12.5 13.5 11.8284 13.5 11V9C13.5 8.17157 12.8284 7.5 12 7.5Z"
            fill="white"
        />
        <path
            d="M12 12.5V15"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M9.5 12.5H14.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);




const Page: React.FC = () => {
    const [bloodGroup, setBloodGroup] = useState<EBloodGroup | ''>('');
    const [bagsNeeded, setBagsNeeded] = useState(1);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [publishARequest, { isError, isLoading, isSuccess }] = usePublishRequestMutation()
    const [searchAddress, setSearchAddress] = useState({
        division: '',
        district: '',
        upazila: '',
    });
    const { division,
        district,
        upazila,
        selectedDivision,
        setSelectedDivision,
        selectedDistrict,
        setSelectedDistrict,
        selectedUpazila,
        setSelectedUpazila, } = useLocationSelect(searchAddress);


    const [err, setErr] = useState<Record<string, string>>({})


    useEffect(() => {
        setDonations(prevDonations => {
            const newDonations = [...prevDonations];
            while (newDonations.length < bagsNeeded) {
                newDonations.push({ date: new Date(), place: "", status: DonationStatus.Upcomming, id: "", bloodType: DonationType.WholeBlood });
            }
            return newDonations.slice(0, bagsNeeded);
        });
    }, [bagsNeeded]);

    const handleDonationChange = (index: number, field: keyof Donation, value: string) => {
        const newDonations = [...donations];
        newDonations[index] = { ...newDonations[index], [field]: value };
        setDonations(newDonations);
    };

    const allBloodGroups = Object.values(EBloodGroup);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!bloodGroup) {
            setErr({ bloodGroup: "দয়া করে রক্তের গ্রুপ নির্বাচন করুন।" })
            return;
        }
        if (!selectedDivision || !selectedDistrict || !selectedUpazila) {
            setErr({ address: "দয়া করে বিভাগ, জেলা ও উপজেলা নির্বাচন করুন।" })
            return;
        }
        setTimeout(() => setErr({}), 5000);

        const formData = new FormData(e.target as HTMLFormElement);
        const requestData = Object.fromEntries(formData.entries());

        donations.forEach((_, index) => {
            delete requestData[`donation_date_${index}`];
            delete requestData[`id`];
            delete requestData[`donation_place_${index}`];
            delete requestData[`donation_blood_type_${index}`];
        });
        setErr({})
        publishARequest({ ...requestData, bloodGroup: mapBloodGroupLebelToEnum(bloodGroup), donations, division: selectedDivision.name, district: selectedDistrict.name, upazila: selectedUpazila.name });
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">রক্তের জন্য আবেদন করুন</h1>
                    <p className="text-gray-600 mt-2">অনুগ্রহ করে নিচের ফর্মটি পূরণ করুন। আপনার আবেদনটি আমাদের প্ল্যাটফর্মে দেখানো হবে।</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-100 space-y-6">
                    <div>
                        <label className="block text-md font-medium text-gray-600 mb-1">রক্তের গ্রুপ</label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {allBloodGroups.map(bg => (
                                <button
                                    key={bg}
                                    type="button"
                                    onClick={() => setBloodGroup(bg)}
                                    className={`py-2 px-1 text-center font-bold border-2 rounded-lg transition-all duration-200 ${bloodGroup === bg
                                        ? 'bg-red-600 text-white border-red-700 shadow-md'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-red-400'
                                        }`}
                                >
                                    {bg}
                                </button>
                            ))}
                        </div>
                        <p className="text-red-700 mt-1"> {err['bloodGroup']}</p>
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="patientName" className="block text-md font-medium text-gray-600 mb-1">রোগীর নাম</label>
                            <input type="text" id="patientName" name="patientName" className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500" required />
                        </div>
                        <div>
                            <label htmlFor="attendantName" className="block text-md font-medium text-gray-600 mb-1">রোগীর অ্যাটেনডেন্টের (যোগাযোগকারী ) নাম</label>
                            <input type="text" id="attendantName" name="attendantName" className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500" required />
                        </div>
                        <div>
                            <label htmlFor="hospital" className="block text-md font-medium text-gray-600 mb-1">হাসপাতালের নাম</label>
                            <input type="text" id="hospital" name="hospital" className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500" required />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-md font-medium text-gray-600 mb-1">যোগাযোগের নম্বর</label>
                            <input type="tel" id="contact" name="contact" className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500" required />
                        </div>
                        <div>
                            <label htmlFor="urgency" className="block text-md font-medium text-gray-600 mb-1">জরুরী অবস্থা</label>
                            <select id="urgency" name="urgency" defaultValue={RequestStatus.Urgent} className="w-full select bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500" required>
                                <option value="Urgent">প্রয়োজন</option>
                                <option value="VeryUrgent">খুব প্রয়োজন</option>
                                <option value="Needed">লাগবে</option>
                            </select>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div>
                        <label className="block text-md font-medium text-gray-600 mb-1">কত ব্যাগ রক্ত প্রয়োজন?</label>
                        <div className="flex items-center space-x-4">
                            {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
                                <BloodBagIcon
                                    key={num}
                                    className="w-12 h-12"
                                    isSelected={num <= bagsNeeded}
                                    onClick={() => setBagsNeeded(num)}
                                />
                            ))}
                            <span className="text-xl font-bold text-red-600">{bagsNeeded} ব্যাগ</span>
                        </div>
                    </div>

                    {donations.map((donation, index) => (
                        <div key={index} className="p-4 border rounded-lg border-gray-300 bg-gray-50">
                            <h4 className="font-semibold text-gray-700 mb-3">ব্যাগ #{index + 1} এর বিবরণ</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor={`donation_date_${index}`}
                                        className="block text-sm font-medium text-gray-500 mb-1"
                                    >
                                        ডোনেশনের তারিখ
                                    </label>
                                    <input
                                        type="date"
                                        id={`donation_date_${index}`}
                                        name={`donation_date_${index}`}
                                        value={donation.date ? new Date(donation.date).toISOString().split("T")[0] : ""}
                                        onChange={(e) => handleDonationChange(index, "date", e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor={`donation_blood_type_${index}`}
                                        className="block text-sm font-medium text-gray-500 mb-1"
                                    >
                                        রক্তদান ধরণ
                                    </label>
                                    <select
                                        id={`donation_blood_type_${index}`}
                                        name={`donation_blood_type_${index}`}
                                        defaultValue="WholeBlood"
                                        className="select w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    >
                                        <option value="WholeBlood">সম্পূর্ণ রক্ত (Whole Blood)</option>
                                        <option value="Plasma">প্লাজমা (Plasma)</option>
                                        <option value="Platelets">প্লেটলেট (Platelets)</option>
                                        <option value="RedBloodCells">লাল কণিকা (Red Blood Cells)</option>
                                    </select>
                                </div>

                                <div className='col-span-2'>
                                    <label htmlFor={`donation_place_${index}`} className="block text-sm font-medium text-gray-500 mb-1">ডোনেশনের স্থান (ওয়ার্ড/বেড সহ)</label>
                                    <input
                                        type="text"
                                        id={`donation_place_${index}`}
                                        name={`donation_place_${index}`}
                                        value={donation.place}
                                        onChange={(e) => handleDonationChange(index, 'place', e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                        placeholder="যেমন: ঢাকা মেডিকেল কলেজ, ওয়ার্ড ১২ "
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="divider"></div>

                    <div>

                        <label
                            htmlFor={`donation_address`}
                            className="block text-md font-medium text-gray-600 mb-1"
                        >
                            রক্তদান ধরণ
                        </label>
                        <div className="flex gap-x-3">

                            {/* Division */}
                            <div className="w-full">

                                <select
                                    id={'donation_address'}
                                    value={selectedDivision?.id ?? ""}
                                    className="select  w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    onChange={(e) => {
                                        const id = Number(e.target.value);
                                        const divi = division.find(d => d.id === id);
                                        if (divi) {
                                            setSelectedDivision({ id: divi.id, name: divi.name });
                                            setSelectedDistrict(null); // reset district
                                            setSelectedUpazila(null);  // reset upazila
                                        }
                                    }}
                                >
                                    <option value="" disabled>বিভাগ নির্বাচন করুন</option>
                                    {division.map(divi => (
                                        <option className="" key={divi.id} value={divi.id}>{divi.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* District */}
                            <div className="w-full">

                                <select
                                    value={selectedDistrict?.id ?? ""}
                                    className="select   w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    disabled={!selectedDivision}
                                    onChange={(e) => {
                                        const id = Number(e.target.value);
                                        const dist = district.find(d => d.id === id && d.division_id === selectedDivision?.id);
                                        if (dist) {
                                            setSelectedDistrict({ id: dist.id, name: dist.name });
                                            setSelectedUpazila(null); // reset upazila
                                        }
                                    }}
                                >
                                    <option value="" disabled>Select District</option>
                                    {district
                                        .filter(d => d.division_id === selectedDivision?.id)
                                        .map(d => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                </select>
                            </div>

                            {/* Upazila */}
                            <div className="flex w-full ">

                                <select
                                    value={selectedUpazila?.id ?? ""}
                                    className="select w-full rounded-lg w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 "
                                    disabled={!selectedDistrict}
                                    onChange={(e) => {
                                        const id = Number(e.target.value);
                                        const upz = upazila.find(u => u.id === id && u.district_id === selectedDistrict?.id);
                                        if (upz) {
                                            setSelectedUpazila({ id: upz.id, name: upz.name });
                                        }
                                    }}
                                >
                                    <option value="" disabled>Select Upazila</option>
                                    {upazila
                                        .filter(u => u.district_id === selectedDistrict?.id)
                                        .map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <p className="text-red-700 mt-1"> {err['address']}</p>
                    </div>



                    <div>
                        <label htmlFor="reason" className="block text-md font-medium text-gray-600 mb-1">রক্তের প্রয়োজনের কারণ</label>
                        <textarea required id="reason" name="reason" rows={2} className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500" placeholder="যেমন: থ্যালাসেমিয়া, অপারেশন, দুর্ঘটনা ইত্যাদি"></textarea>
                    </div>
                    <div>
                        <label htmlFor="donorMessage" className="block text-md font-medium text-gray-600 mb-1">দাতার জন্য কোন বার্তা</label>
                        <textarea required id="donorMessage" name="donorMessage" rows={4} className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500" placeholder="যেমন: রোগী বর্তমানে হাসপাতালে ভর্তি, জরুরি রক্তের প্রয়োজন।"></textarea>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform duration-300 transform hover:scale-105"
                        >
                            {isLoading ? <LoadingAnimation /> : 'আবেদন জমা দিন'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;