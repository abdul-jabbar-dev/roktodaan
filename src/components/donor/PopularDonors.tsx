
import API from '@/api';
import { DonorInfo } from '@/types/user/user';
import { mapBloodGroupEnumToLabel } from '@/utils/BloodGroupFormet';
import getDefaultImg from '@/utils/DefaultImg';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { DonorModal } from './DonorModal';
 

const PopularDonorCard: React.FC<{ donor: Record<string, any> }> = ({ donor }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-0 hover:bg-gray-100 even:bg-red-50/20 ">
        <div className="flex items-center space-x-3">
            <Image
                     src={
                       donor.profile.img ||
                       getDefaultImg(donor.profile.gender as 'male' | 'female')
                     }
                     height={60}
                     width={60}
                     alt={donor.profile.fullName || 'donor'}
                     className="w-10 h-10 rounded-full object-cover"
                   />
            <div>
                <p className="font-semibold text-gray-800">{donor.profile.fullName}</p>
                <p className="text-sm text-gray-500">{donor.location}</p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <span className="bg-red-100 text-red-700 font-bold text-sm px-3 py-1 rounded-full">
                    {mapBloodGroupEnumToLabel(donor.profile.bloodGroup)}
                  </span>
            <p className="text-sm text-gray-600 hidden sm:block">
                {donor.address.area
                    ? `${donor.address.area}, ${donor.address.upazila}, ${donor.address.division}`
                    : `${donor.address.upazila}, ${donor.address.division}`}
            </p> 
                  <DonorModal
                    donor={donor}
                    trigger={
                      <button className="bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                        দেখুন
                      </button>
                    }
                  /> 
        </div>
    </div>
);


const PopularDonors: React.FC = async () => {
    const cookiesAccessor = cookies()

    const { data: popularDonors } = await API.user.getPopularUsers(cookiesAccessor);
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">জনপ্রিয় ডোনার ও মনোনীত ব্যক্তি</h2>
            <div className="space-y-2">
                {popularDonors.map((donor: DonorInfo) => <PopularDonorCard key={donor.id} donor={donor} />)}
            </div>
        </div>
    );
};

export default PopularDonors;
