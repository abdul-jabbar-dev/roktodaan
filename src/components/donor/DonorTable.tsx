import { DonorInfo } from '@/types/user/user';
import  { getLastDonationDateRelativeToday } from '@/utils/DateFormet';
import getDefaultImg from '@/utils/DefaultImg';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';
import { DonorModal } from './DonorModal';
import { mapBloodGroupEnumToLabel } from '@/utils/BloodGroupFormet';

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

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
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon)) / 2;
  return R * 2 * Math.asin(Math.sqrt(a));
};

export const DonorRow: React.FC<{ donor: DonorInfo }> = ({ donor }) => (
  <tr className="border-b even:bg-red-50/20 border-gray-200 last:border-b-0 hover:bg-gray-100">
    <td className="py-4 px-2 sm:px-4">
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
          <p className="text-sm text-gray-500">
            {donor.address.area
              ? `${donor.address.area}, ${donor.address.upazila}, ${donor.address.division}`
              : `${donor.address.upazila}, ${donor.address.division}`}
          </p>
        </div>
      </div>
    </td>
    <td className="py-4 px-2 sm:px-4 text-center">
      <span className="bg-red-100 text-red-700 font-bold text-sm px-3 py-1 rounded-full">
        {mapBloodGroupEnumToLabel(donor.profile.bloodGroup)}
      </span>
    </td>
    <td className="py-4 px-2 sm:px-4 text-gray-600 text-center hidden md:table-cell">
      <div>{getLastDonationDateRelativeToday(donor)}</div>
    </td>
    <td className="py-4 px-2 sm:px-4 text-center">
      <DonorModal
        donor={donor}
        trigger={
          <button className="bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
            দেখুন
          </button>
        }
      />
    </td>
  </tr>
);

const Pagination: React.FC<{
  SET_ITEMS_PER_PAGE: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ SET_ITEMS_PER_PAGE, currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg text-gray-600 disabled:opacity-50 hover:bg-gray-200"
      >
        ←
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-lg ${
            currentPage === number
              ? 'bg-red-600 text-white'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg text-gray-600 disabled:opacity-50 hover:bg-gray-200"
      >
        →
      </button>
      <div className="relative">
        <select
          onChange={(e) => SET_ITEMS_PER_PAGE(Number(e.target.value))}
          className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
        >
          <option value={5}>সংখ্যা (৫)</option>
          <option value={10}>১০</option>
          <option value={20}>২০</option>
          <option value={50}>৫০</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </nav>
  );
};

const DonorTable: React.FC<DonorTableProps> = ({
  userLocation,
  searchRadius,
  mockDonors,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE, SET_ITEMS_PER_PAGE] = useState(5);

  const filteredDonors = useMemo(() => {
    if (!userLocation || !searchRadius || searchRadius === 0) {
      return mockDonors;
    }
    return mockDonors.filter((donor: DonorInfo) => {
      const coords = donor?.address?.coords;
      if (typeof coords !== 'object') return false;

      let donorLat: number | undefined;
      let donorLon: number | undefined;

      if (Array.isArray(coords)) {
        donorLat = coords[0]?.[0];
        donorLon = coords[0]?.[1];
      } else {
        donorLat = coords.latitude;
        donorLon = coords.longitude;
      }

      if (typeof donorLat !== 'number' || typeof donorLon !== 'number')
        return false;

      const distance = getDistanceInKm(
        userLocation.latitude,
        userLocation.longitude,
        donorLat,
        donorLon
      );

      return distance <= searchRadius;
    });
  }, [userLocation, searchRadius, mockDonors]);

  const totalPages = Math.ceil(filteredDonors.length / ITEMS_PER_PAGE);

  const paginatedDonors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDonors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, ITEMS_PER_PAGE, filteredDonors]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-red-50 sticky top-0">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                ডোনার (ছবি ও নাম)
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                ব্লাড গ্রুপ
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                শেষ ডোনেশন
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                অ্যাকশন
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedDonors.length > 0 ? (
              paginatedDonors.map((donor) => (
                <DonorRow key={donor.id} donor={donor} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-10 text-gray-500 font-medium"
                >
                  এই ফিল্টারে কোন ডোনার পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          SET_ITEMS_PER_PAGE={SET_ITEMS_PER_PAGE}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default DonorTable;
