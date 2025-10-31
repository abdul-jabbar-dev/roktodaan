
import React, { useState } from 'react';

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const MapViewIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a.75.75 0 01.75.75V5.5h4.75a.75.75 0 010 1.5H10.75V12h4.75a.75.75 0 010 1.5H10.75V17.25a.75.75 0 01-1.5 0V13.5H4.5a.75.75 0 010-1.5H9V7H4.5a.75.75 0 010-1.5H9V2.75A.75.75 0 0110 2z" />
        <path fillRule="evenodd" d="M8.22 4.407a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06L9.69 7.5 8.22 6.03a.75.75 0 010-1.06zM3.25 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm12 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);
const ListViewIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);
const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

interface DonorSearchProps {
    onLocationRequest: () => void;
    onRadiusChange: (radius: number) => void;
    isLocating: boolean;
    locationError: string;
    view: 'map' | 'list';
    setView: React.Dispatch<React.SetStateAction<"map" | "list">>
}

const DonorSearch: React.FC<DonorSearchProps> = ({ onLocationRequest, onRadiusChange, isLocating, locationError, view, setView }) => {
    const [activeTab, setActiveTab] = useState('new');

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="relative">
                    <select className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500">
                        <option>শহর/জেলা (ঢাকা)</option>
                        <option>চট্টগ্রাম</option>
                        <option>খুলনা</option>
                        <option>রাজশাহী</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>
                <div className="relative">
                    <select className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500">
                        <option>ব্লাড গ্রুপ (সব)</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>
                <div className="relative">
                    <select
                        className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                        onChange={(e) => onRadiusChange(Number(e.target.value))}
                    >
                        <option value="0">দূরত্ব (সব)</option>
                        <option value="5">৫ কিমি</option>
                        <option value="10">১০ কিমি</option>
                        <option value="20">২০ কিমি</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>
                <div className="relative">
                    <select className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500">
                        <option>সর্ট (নতুন/পুরাতন)</option>
                        <option>নতুন</option>
                        <option>পুরাতন</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>
                <div className="relative">
                    <select className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500">
                        <option>সংখ্যা</option>
                        <option>১০</option>
                        <option>২০</option>
                        <option>৫০</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    placeholder="নাম / ফোন / এলাকার নাম দিয়ে খুঁজুন..."
                    className="flex-grow bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:bg-white focus:border-red-500"
                />
                <button
                    onClick={onLocationRequest}
                    disabled={isLocating}
                    className="flex items-center bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-wait"
                    aria-label="আমার বর্তমান অবস্থান ব্যবহার করুন"
                >
                    <LocationMarkerIcon className="w-5 h-5 mr-2" />
                    {isLocating ? 'লোকেশন খুঁজছে...' : 'আমার অবস্থান'}
                </button>

                <button className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300">
                    ফিল্টার করুন
                </button>

            </div>
            {locationError && <p className="text-sm text-red-600">{locationError}</p>}
            <div className="flex items-center space-x-2">
                <div className="flex-1">
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full ${activeTab === 'new' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        নতুন ডোনার
                    </button>
                    <button
                        onClick={() => setActiveTab('clear')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full ${activeTab === 'clear' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        রিমুভ ফিল্টার
                    </button>
                </div>
                <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-lg ">
                    <button
                        onClick={() => setView('list')}
                        className={`flex items-center space-x-2 px-4 py-1.5 text-sm font-medium rounded-lg ${view === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}
                        aria-pressed={view === 'list'}
                    >
                        <ListViewIcon className="w-5 h-5" />
                        <span>লিষ্ট ভিউ</span>
                    </button>
                    <button
                        onClick={() => setView('map')}
                        className={`flex items-center space-x-2 px-4 py-1.5 text-sm font-medium rounded-lg ${view === 'map' ? 'bg-white shadow' : 'text-gray-600'}`}
                        aria-pressed={view === 'map'}
                    >
                        <MapViewIcon className="w-5 h-5" />
                        <span>ম্যাপ ভিউ</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonorSearch;
