'use client';

import React, { useState } from 'react';
import DonorTable from './DonorTable';
import DonorSearch from './DonorSearch';
import MapView from './MapView';
import { getAreaNameOSM } from '@/utils/AreaCalculate';
import { DonorInfo } from '@/types/user/user';
import BloodGroup from '@/types/blood/group';
import API from '@/api';
import { mapBloodGroupEnumToLabel } from '@/utils/BloodGroupFormet';

interface UserLocation {
  latitude: number;
  longitude: number;
}

const DonorViewPoint: React.FC<{ allDonors: DonorInfo[] }> = ({ allDonors }) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [filteredDonors, setFilteredDonors] = useState<DonorInfo[]>(allDonors);

  const [searchString, setSearchString] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | null>(null);
  const [searchAddress, setSearchAddress] = useState({
    division: '',
    district: '',
    upazila: '',
  });
  const [searchRadius, setSearchRadius] = useState<number>(0);
  const [view, setView] = useState<'map' | 'list'>('list');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    let filteredDonors = allDonors;

    // 1️⃣ Filter by search string (name, phone, etc.)
    if (searchString) {
      const searchLower = searchString.toLowerCase().trim();
      filteredDonors = filteredDonors.filter(donor =>
        donor?.profile?.fullName?.toLowerCase()?.trim()?.includes(searchLower) ||
        donor?.profile?.phoneNumber?.toLowerCase()?.trim()?.includes(searchLower)
      );
    }

    // 2️⃣ Filter by blood group
    if (bloodGroup) {
      filteredDonors = filteredDonors.filter(donor => {
        console.log(donor.profile?.bloodGroup, bloodGroup)
        return mapBloodGroupEnumToLabel(donor.profile?.bloodGroup) === bloodGroup
      });
    }

    // 3️⃣ Filter by address
    if (searchAddress.division) {
      filteredDonors = filteredDonors.filter(donor => donor.address.division === searchAddress.division);
    }
    if (searchAddress.district) {
      filteredDonors = filteredDonors.filter(donor => donor.address.district === searchAddress.district);
    }
    if (searchAddress.upazila) {
      filteredDonors = filteredDonors.filter(donor => donor.address.upazila === searchAddress.upazila);
    }

    // 4️⃣ Filter by radius if user location exists
    if (userLocation && searchRadius > 0) {
      filteredDonors = filteredDonors.filter(donor => {
        if (!donor.address.latitude || !donor.address.longitude) return false;
        const distance = getDistanceFromLatLonInKm(
          userLocation.latitude,
          userLocation.longitude,
          donor.address.latitude,
          donor.address.longitude
        );
        return distance <= searchRadius;
      });
    }

    // 5️⃣ Update your state (so table/map can use filtered donors)
    setFilteredDonors(filteredDonors);
  }, [searchString, bloodGroup, searchAddress, searchRadius, allDonors, userLocation]);

  function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  // 📍 Handle user location
  const handleLocationRequest = () => {
    setIsLocating(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('আপনার ব্রাউজারে জিওলোকেশন সাপোর্ট করে না।');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const location = await getAreaNameOSM(
            position.coords.latitude,
            position.coords.longitude
          );
          console.log('📍 User current area:', location);

          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } catch (error) {
          console.error('Location fetch failed:', error);
          setLocationError('লোকেশন ডেটা পাওয়া যায়নি।');
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setLocationError('লোকেশন পাওয়া যায়নি। অনুগ্রহ করে পারমিশন চেক করুন।');
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <DonorSearch
        isLocating={isLocating}
        locationError={locationError}
        view={view}
        setView={setView}
        onLocationRequest={handleLocationRequest}
        onRadiusChange={setSearchRadius}
        searchString={searchString}
        setSearchString={setSearchString}
        bloodGroup={bloodGroup}
        setBloodGroup={setBloodGroup}
        searchAddress={searchAddress}
        setSearchAddress={setSearchAddress}
        setIsLoading={setIsLoading}
      />

      {view === 'list' ? (
        <DonorTable
          mockDonors={filteredDonors}
          userLocation={userLocation}
          searchRadius={searchRadius}
        />
      ) : (
        <MapView
          userLocation={userLocation}
          view={view}
          onLocationRequest={handleLocationRequest}
          mapDonors={filteredDonors}
        />
      )}
    </div>
  );
};

export default DonorViewPoint;
