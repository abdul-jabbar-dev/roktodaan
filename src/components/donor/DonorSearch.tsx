'use client';
import React, { useState } from 'react';
import { useLocationSelect } from '@/hooks/useLocationSelect';
import BloodGroup from '@/types/blood/group';
import CDTooltip from '../ui/CDTooltip';

interface DonorSearchProps {
  isLocating: boolean;
  locationError: string;
  view: 'map' | 'list';
  setView: React.Dispatch<React.SetStateAction<'map' | 'list'>>;
  onLocationRequest: () => void;
  onRadiusChange: (radius: number) => void;
  searchString: string;
  setSearchString: (v: string) => void;
  bloodGroup: BloodGroup | null;
  setBloodGroup: (v: BloodGroup | null) => void;
  searchAddress: { division: string; district: string; upazila: string };
  setSearchAddress: React.Dispatch<
    React.SetStateAction<{ division: string; district: string; upazila: string }>
  >;
  setIsLoading: (v: boolean) => void;
}

const DonorSearch: React.FC<DonorSearchProps> = ({
  onLocationRequest,
  onRadiusChange,
  isLocating,
  locationError,
  view,
  setView,
  setSearchString,
  bloodGroup,
  setBloodGroup,
  searchAddress,
  setSearchAddress,
  setIsLoading,
}) => {
  const { division, district, upazila } = useLocationSelect(searchAddress);

  // Local input state for button-triggered search
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setIsLoading(true);
    setSearchString(inputValue);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Division */}
        <select
          value={searchAddress.division}
          onChange={(e) =>
            setSearchAddress({ ...searchAddress, division: e.target.value })
          }
          className="bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">বিভাগ নির্বাচন করুন</option>
          {division.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          value={searchAddress.district}
          onChange={(e) =>
            setSearchAddress({ ...searchAddress, district: e.target.value })
          }
          className="bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">জেলা নির্বাচন করুন</option>
          {district.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          value={searchAddress.upazila}
          onChange={(e) =>
            setSearchAddress({ ...searchAddress, upazila: e.target.value })
          }
          className="bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">উপজেলা নির্বাচন করুন</option>
          {upazila.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Blood Group */}
        <select
          value={bloodGroup ?? ''}
          onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
          className="bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">ব্লাড গ্রুপ (সব)</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        {/* Distance */}<CDTooltip placement='top' tooltipText='Under Construction'>
          <select
            onChange={(e) => onRadiusChange(Number(e.target.value))}
            className="bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="0">দূরত্ব (সব)</option>
            <option value="5">৫ কিমি</option>
            <option value="10">১০ কিমি</option>
            <option value="20">২০ কিমি</option>
          </select></CDTooltip>
      </div>

      {/* Search + Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="নাম / ফোন / এলাকার নাম দিয়ে খুঁজুন..."
          className="flex-grow bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
        />

        <button
          onClick={onLocationRequest}
          disabled={isLocating}
          className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
        >
          {isLocating ? 'লোকেশন খুঁজছে...' : 'আমার অবস্থান'}
        </button>

        <button
          onClick={handleSearch}
          className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition"
        >
          ফিল্টার করুন
        </button>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-1.5 rounded-lg ${view === 'list' ? 'bg-white shadow' : 'text-gray-600'
              }`}
          >
            লিষ্ট ভিউ
          </button>
          <button
            onClick={() => setView('map')}
            className={`px-4 py-1.5 rounded-lg ${view === 'map' ? 'bg-white shadow' : 'text-gray-600'
              }`}
          >
            ম্যাপ ভিউ
          </button>
        </div>
      </div>

      {locationError && <p className="text-sm text-red-600">{locationError}</p>}
    </div>
  );
};

export default DonorSearch;
