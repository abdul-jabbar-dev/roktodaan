import { UserState } from '@/redux/slice/userSlice';
import React, { useState } from 'react';
import AdminIcon from '@rsuite/icons/Admin';
import { BloodRequest, DonationStatus, RequestStatus } from '@/types/request/type';
import  ArrowLeftLineIcon  from '@rsuite/icons/ArrowLeftLine';
import ReserveProfile from './ReserveProfile';
import ClientDate from '@/utils/DateFormet';
 

const donationStatus = Object.values(DonationStatus)

const donationStatusStyle = (status: DonationStatus): string => {
    const value: Record<DonationStatus, string> = {
        Done: "bg-green-100 opacity-70",
        NoNeed: "bg-gray-100  ",
        Reserved: "bg-blue-50 border-blue-200 border shadow",
        Upcomming: "bg-red-50 border-red-100 border shadow",
    }
    return value[status]
}

const RequestDontaion = ({
    user,
    rootEdit,
}: {
    user: UserState;
    rootEdit: boolean;
}) => {
        const statusStyles: { [key in RequestStatus]: string } = {
        [RequestStatus.VeryUrgent]: 'bg-red-600 text-white',
        [RequestStatus.Urgent]: 'bg-yellow-400 text-yellow-900',
        [RequestStatus.Needed]: 'bg-green-400 text-green-900',
    };

    const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null)
    console.log(user)
    return (
        <div className="bg-gray-50 border border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-sm w-full  mb-6">
            <div className="flex items-center mb-2">
                <AdminIcon className="h-4 w-4 mr-2 text-gray-600" />
                <h3 className="font-semibold text-md">Blood applications</h3>
            </div>

            <button className={"btn btn-link"} onClick={() => setSelectedRequest(null)}> <ArrowLeftLineIcon className="w-5 h-5" />Back </button>
            <div className="overflow-x-auto">
                {selectedRequest ? <RequestDonarData setSelectedRequest={setSelectedRequest} selectedRequest={selectedRequest} key={selectedRequest.patientName} /> : <table className="min-w-full bg-white">
                    <thead className="bg-red-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">রোগীর নাম</th>
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">রক্তের গ্রুপ</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">হসপিটাল</th>
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">আবেদনের তারিখ</th>
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">স্ট্যাটাস</th>
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {(user as any)?.bloodRequest?.map((request : BloodRequest) => (
                            <tr key={request.id} className="hover:bg-gray-50">
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <p className="font-medium text-gray-900">{request.attendantName}</p>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-center">
                                    <span className="bg-red-100 text-red-700 font-bold text-sm px-3 py-1 rounded-full">{request.bloodGroup}</span>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-gray-600 hidden md:table-cell">{request.hospital}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-gray-600 text-center hidden sm:table-cell">{ClientDate({dateString:request.postedAt})}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-center">
                                    {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                     {request.}
                                 </span> */}
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-center">
 
                                    <button onClick={() => { setSelectedRequest(request) }} className="w-full mt-4 bg-red-600  cursor-pointer text-white font-semibold py-2.5 rounded-md hover:bg-red-700 transition duration-300">
                                        ম্যানেজ করুন
                                    </button> 



                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    );
}

export default RequestDontaion;



const RequestDonarData = ({ selectedRequest, setSelectedRequest }: { selectedRequest: BloodRequest, setSelectedRequest: React.Dispatch<React.SetStateAction<BloodRequest | null>> }) => {


    return (<div>
        <h3 className="font-bold text-lg text-gray-800 mb-3 ">প্রয়োজনীয় রক্তের ব্যাগ ম্যানেজ করুন</h3>
        <div className="space-y-4">
            {selectedRequest.donations.map((donation, index) => (
                <div key={index} className={`p-4 rounded-lg  ${donationStatusStyle(donation.status)}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-800">ব্যাগ #{index + 1}</p>
                            <p className="text-sm text-gray-600">তারিখ: {new Date(donation.date).toDateString()} | স্থান: {donation.place}</p>
                        </div>
                        <select
                            value={donation.status}
                            // onChange={(e) => handleDonationStatusChange(index, e.target.value as DonationStatus)}
                            className="w-26 bg-white border border-gray-300 rounded-md py-1 px-2 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                            {donationStatus.map(status => <option key={status} value={status}>{status}</option>)}
                        </select>
                    </div>
                    {donation.status === DonationStatus.Reserved && (
                        <div className=" pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">সংরক্ষিত ডোনারের তথ্য:</h4>



                            <ReserveProfile setSelectedRequest={setSelectedRequest} donation={donation} />




                            {/* <div className="flex flex-col sm:flex-row gap-3">
                                    {getNumber(donation) && (
                                        <a
                                            href={`tel:${getNumber(donation)}`}
                                            className="flex-1 flex items-center justify-center bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
                                        >
                                            <PhoneIcon className="w-5 h-5 mr-2" />
                                            ফোন করুন
                                        </a>
                                    )}
                                    {getAddress(donation) && (
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getAddress(donation))}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            <LocationMarkerIcon className="w-5 h-5 mr-2" />
                                            ঠিকানা দেখুন
                                        </a>
                                    )}
                                </div> */}


                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>)
}