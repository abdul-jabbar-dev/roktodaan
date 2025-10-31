'use client';
import React, { useState } from 'react';
import DonorTable from './DonorTable';
import DonorSearch from './DonorSearch';
import MapView from './MapView';
 import { getAreaNameOSM } from '@/utils/AreaCalculate';
import { DonorInfo } from '@/types/user/user';

interface UserLocation {
  latitude: number;
  longitude: number;
}

const DonorViewPoint = ({ allDonors }: { allDonors: DonorInfo[] }) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(0);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [view, setView] = useState<'map' | 'list'>('list');

   
  // 🔘 Get user location
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
        const location = await getAreaNameOSM(position.coords.latitude, position.coords.longitude);
        
        console.log('📍 User current area:', location);
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLocating(false);
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
        view={view}
        setView={setView}
        onLocationRequest={handleLocationRequest}
        onRadiusChange={setSearchRadius}
        isLocating={isLocating}
        locationError={locationError}
      />
     {view === 'list' ? (
        <DonorTable   mockDonors={allDonors} userLocation={userLocation} searchRadius={searchRadius} />
      ) : (
        <MapView userLocation={userLocation} view={view} onLocationRequest={handleLocationRequest}  mapDonors={allDonors}/>
      )} 
      
    </div>
  );
};

export default DonorViewPoint;
