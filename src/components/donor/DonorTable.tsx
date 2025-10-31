
import { DonorInfo } from '@/types/user/user';
import ClientDate, { getLastDonationDateRelativeToday } from '@/utils/DateFormet';
import getDefaultImg from '@/utils/DefaultImg';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';
import { DonorModal } from './DonorModal';
import { mapBloodGroupEnumToLabel } from '@/utils/BloodGroupFormet';


const ITEMS_PER_PAGE = 6;

interface UserLocation {
    latitude: number;
    longitude: number;
}

interface DonorTableProps {
    userLocation: UserLocation | null;
    searchRadius: number;
    mockDonors: DonorInfo[];
}

const getDistanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
};

export const DonorRow: React.FC<{ donor: DonorInfo, }> = ({ donor }) => (
    <tr className="border-b even:bg-red-50/20 border-gray-200 last:border-b-0 hover:bg-gray-100">
        <td className="py-4 px-2 sm:px-4">
            <div className="flex items-center space-x-3">
                <Image src={donor.profile.img || getDefaultImg(donor.profile.gender as "male" | "female")} height={60} width={60} alt={donor.profile.fullName || "donor"} className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <p className="font-semibold text-gray-800">{donor.profile.fullName}</p>
                    <p className="text-sm text-gray-500">{
                        donor.address.area
                            ? `${donor.address.area}, ${donor.address.upazila}, ${donor.address.division}`
                            : donor.address.upazila + ", " + donor.address.division}</p>
                </div>
            </div>
        </td>
        <td className="py-4 px-2 sm:px-4 text-center">
            <span className="bg-red-100 text-red-700 font-bold text-sm px-3 py-1 rounded-full">{mapBloodGroupEnumToLabel(donor.profile.bloodGroup)}</span>
        </td>
        <td className="py-4 px-2 sm:px-4 text-gray-600 text-center hidden md:table-cell">

            <div>
                {
                    getLastDonationDateRelativeToday(donor)
                }
            </div>
        </td>
        <td className="py-4 px-2 sm:px-4 text-center">
            <DonorModal
                donor={donor}
                trigger={
                    <button className="bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"  >
                        দেখুন
                    </button>
                }
            />
        </td>
    </tr>
);

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void; }> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center items-center space-x-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg text-gray-600 disabled:opacity-50 hover:bg-gray-200"
            >
                -
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-3 py-1 rounded-lg ${currentPage === number ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg text-gray-600 disabled:opacity-50 hover:bg-gray-200"
            >
                +
            </button>
        </nav>
    );
};

const DonorTable: React.FC<DonorTableProps> = ({ userLocation, searchRadius, mockDonors }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const filteredDonors = useMemo(() => {
        if (!userLocation || !searchRadius || searchRadius === 0) {
            return mockDonors;
        }
        return mockDonors.filter((donor: DonorInfo) => {
            const coords = donor?.address?.coords;
            if (typeof coords !== 'object') return false
            if (
                !coords ||
                (Array.isArray(coords)
                    ? coords.length === 0 ||
                    typeof coords[0][0] === 'undefined' ||
                    typeof coords[0][1] === 'undefined'
                    : typeof coords.latitude === 'undefined' ||
                    typeof coords.longitude === 'undefined')
            ) {
                return false;
            } else {
 
                let donorLat: number | undefined;
                let donorLon: number | undefined;
                if (Array.isArray(coords)) {
                    // Assuming coords is [ [lat, lon], ... ]
                    donorLat = coords[0]?.[0];
                    donorLon = coords[0]?.[1];
                } else {
                    donorLat = coords.latitude;
                    donorLon = coords.longitude;
                }
                if (typeof donorLat !== 'number' || typeof donorLon !== 'number') return false;
                const distance = getDistanceInKm(
                    userLocation.latitude, userLocation.longitude,
                    donorLat, donorLon
                );
                return distance <= searchRadius;
            }
        });
    }, [userLocation, searchRadius]);

    const totalPages = Math.ceil(filteredDonors.length / ITEMS_PER_PAGE);

    const paginatedDonors = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredDonors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredDonors]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    return (
        <div className="mt-6">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-red-50">
                        <tr>
                            <th className="py-3 px-2 sm:px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">ডোনার (ছবি ও নাম)</th>
                            <th className="py-3 px-2 sm:px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">ব্লাড গ্রুপ</th>
                            <th className="py-3 px-2 sm:px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">শেষ ডোনেশন</th>
                            <th className="py-3 px-2 sm:px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* paginatedDonors */mockDonors.length > 0 ? (
                            /* paginatedDonors */mockDonors.map(donor => <DonorRow key={donor.id} donor={donor} />)
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">
                                    এই ফিল্টারে কোন ডোনার পাওয়া যায়নি।
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </div>
    );
};

export default DonorTable;