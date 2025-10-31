'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DonorInfo } from '@/types/user/user';
import { getLastDonationDateRelativeToday } from '@/utils/DateFormet';
import getDefaultImg from '@/utils/DefaultImg';

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


interface UserLocation {
    latitude: number;
    longitude: number;
}

const haversineDistance = (
    coords1: { latitude: number; longitude: number },
    coords2: { latitude: number; longitude: number }
) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const DonorInfoCard: React.FC<{
    donor: DonorInfo;
    onClose: () => void;
    position: { top: number; left: number };
}> = ({ donor, position, onClose }) => (
    <div
        className="absolute bg-white rounded-lg shadow-lg p-4 w-72 z-20 transition-all duration-200"
        style={{
            top: position.top,
            left: position.left,
            transform: 'translate(24px, -105%)',
        }}
    >
        <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        >
            <CloseIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-3">
            <img
                src={donor.profile.img || getDefaultImg(donor.profile.gender as 'male' | 'female')}
                alt={donor.profile.fullName}
                className="w-12 h-12 rounded-full object-cover"
            />
            <div>
                <p className="font-bold text-gray-800">{donor.profile.fullName}</p>
                <p className="text-sm text-gray-500">
                    <LocationMarkerIcon className="w-3 h-3 inline-block mr-1" />
                    {donor.address.upazila}, {donor.address.district}
                </p>
            </div>
            <div className="ml-auto text-right">
                <p className="text-xs text-gray-500">Last Donated</p>
                <p className="text-xs font-semibold">
                    {getLastDonationDateRelativeToday(donor)}
                </p>
            </div>
        </div>
        <div className="flex items-center justify-between mt-3">
            <span className="bg-red-100 text-red-700 font-bold text-sm px-3 py-1 rounded-full">
                {donor.profile.bloodGroup}
            </span>
            <button className="bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                যোগাযোগ করুন
            </button>
        </div>
    </div>
);

const MapView: React.FC<{
    mapDonors: DonorInfo[];
    userLocation: UserLocation | null;
    onLocationRequest: () => void;
    view: string;
}> = ({ mapDonors, userLocation, onLocationRequest, view }) => {
    const [selectedDonor, setSelectedDonor] = useState<DonorInfo | null>(null);
    const [isLocating, setIsLocating] = useState(true);
    const [distanceFilter, setDistanceFilter] = useState(50);
    const [map, setMap] = useState<L.Map | null>(null);
    const [cardPosition, setCardPosition] = useState<{ top: number; left: number } | null>(null);
    const markersRef = useRef<L.LayerGroup | null>(null);
    const userMarkerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        if (userLocation) setIsLocating(false);
        else {
            setIsLocating(true);
            onLocationRequest();
        }
    }, [userLocation]);

    const donorsWithDistance = useMemo(() => {
        if (!userLocation) return [];
        return mapDonors
            .filter((d) => d.address?.coords)
            .map((donor) => {
                const c = donor.address.coords;
                if (Array.isArray(c)) return { ...donor, distance: 9999 };
                return {
                    ...donor, distance: haversineDistance(userLocation, c as {
                        latitude: number;
                        longitude: number;
                    })
                };
            })
            .sort((a, b) => a.distance - b.distance);
    }, [mapDonors, userLocation]);

    const filteredDonors = useMemo(
        () => donorsWithDistance.filter((d) => d.distance <= distanceFilter || d.distance === 9999),
        [donorsWithDistance, distanceFilter]
    );

    // Map Initialization
    useEffect(() => {
        const container = document.getElementById('map');
        if (!container || !userLocation) return;

        if (map) map.remove();

        const mapInstance = L.map(container).setView([userLocation.latitude, userLocation.longitude], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstance);

        // Home marker for user location
        const userIcon = L.divIcon({
            html: ` <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="red" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V14H9v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9z"></path>
    </svg>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });
        const userMarker = L.marker([userLocation.latitude, userLocation.longitude], { icon: userIcon })
            .addTo(mapInstance)
            .bindPopup('আপনি এখানে');
        userMarkerRef.current = userMarker;

        setMap(mapInstance);
    }, [userLocation, view]);

    // Handle selecting donor
    const handleSelectDonor = (donor: DonorInfo) => {
        setSelectedDonor(donor);

        const c = donor.address.coords;

        if (!map || !c) return;

        if (!Array.isArray(c)) {
            map.flyTo([c.latitude, c.longitude], 14);
        } else {
            const polygon = L.polygon(c);
            map.fitBounds(polygon.getBounds())
        }
    };

    // Render markers/polygons
    useEffect(() => {
        if (!map) return;
        if (markersRef.current) markersRef.current.clearLayers();

        const layerGroup = L.layerGroup();

        filteredDonors.forEach((donor) => {
            const coords = donor.address?.coords;
            if (!coords) return;

            if (!Array.isArray(coords)) {
                const icon = L.divIcon({
                    html: `<div class="w-4 h-4 rounded-full border-2 border-white ring-4 ${selectedDonor?.id === donor.id ? 'bg-red-600 ring-red-500' : 'bg-red-400 ring-red-200'
                        } cursor-pointer transition-all"></div>`,
                    className: '',
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                });

                const marker = L.marker([coords.latitude, coords.longitude], { icon });
                marker.on('click', () => handleSelectDonor(donor)).bindPopup(donor.profile.fullName || "Donor");

                marker.bindPopup(donor.profile.fullName || "Donor");
                marker.on('mouseover', (e) => {
                    marker.openPopup();
                })
                marker.on('mouseout', (e) => {
                    marker.closePopup();
                });

                layerGroup.addLayer(marker);
            } else {
                const polygon = L.polygon(coords, {
                    color: 'red',
                    weight: 2,
                    fillColor: 'rgba(255, 0, 0, 0.3)',
                });
                polygon.bindPopup(donor.profile.fullName || 'Donor');
                polygon.on('click', () => handleSelectDonor(donor)).bindPopup(donor.profile.fullName || "Donor");
                polygon.on('mouseover', (e) => {
                    polygon.openPopup();
                })
                polygon.on('mouseout', (e) => {
                    polygon.closePopup();
                });
                layerGroup.addLayer(polygon);
            }
        });

        layerGroup.addTo(map);
        markersRef.current = layerGroup;
    }, [filteredDonors, selectedDonor, map]);

    // Update card position
    const updateCardPosition = () => {
        if (selectedDonor && map) {
            const c = selectedDonor.address.coords;
            if (!c || !('latitude' in c) || !('longitude' in c)) {
                return
            }
            if (!Array.isArray(c)) {
                const point: { top: number, left: number } = map.latLngToContainerPoint(L.latLng(c.latitude, c.longitude)) as unknown as { top: number, left: number };
                setCardPosition(point);
            } else {
                const point = map.latLngToContainerPoint(L.latLng(c[0], c[1])) as unknown as { top: number, left: number };
                setCardPosition(point);
            }
        }
    };

    useEffect(() => {
        if (selectedDonor && map) {
            updateCardPosition();
            map.on('move', updateCardPosition);
            map.on('zoom', updateCardPosition);
        }
        return () => {
            map?.off('move', updateCardPosition);
            map?.off('zoom', updateCardPosition);
        };
    }, [selectedDonor, map]);

    if (isLocating) {
        return (
            <div className="flex justify-center items-center h-[650px]">
                <p>📍 আপনার অবস্থান খোঁজা হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <div className="flex flex-col lg:flex-row gap-4 h-[650px]">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 bg-gray-50 p-4 rounded-lg overflow-y-auto">
                    <h3 className="font-bold mb-3">কাছাকাছি ডোনার</h3>
                    {filteredDonors.map((donor) => (
                        <div
                            key={donor.id}
                            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedDonor?.id === donor.id ? 'bg-red-100' : 'hover:bg-white'
                                }`}
                            onClick={() => handleSelectDonor(donor)}
                        >
                            <img
                                src={donor.profile.img || getDefaultImg(donor.profile.gender as 'male' | 'female')}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-800 text-sm">{donor.profile.fullName}</p>
                                <p className="text-xs text-gray-500">
                                    {donor.address.area || donor.address.upazila}, {donor.address.district}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map */}
                <div className="w-full lg:w-2/4 relative rounded-lg overflow-hidden bg-gray-200">
                    <div id="map" className="w-full h-full z-10" />
                    {selectedDonor && cardPosition && (
                        <DonorInfoCard donor={selectedDonor} position={cardPosition} onClose={() => setSelectedDonor(null)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapView;
