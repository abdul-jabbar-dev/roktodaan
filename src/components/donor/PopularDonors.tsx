
import React from 'react';

const popularDonors = [
    { id: 1, name: 'আব্দুল কাদের', location: 'মিরপুর, ঢাকা', bloodGroup: 'O+', lastDonation: '২ সপ্তাহ আগে', avatarUrl: 'https://picsum.photos/seed/1/100/100' },
    { id: 2, name: 'ফারজানা আক্তার', location: 'যাত্রাবাড়ী, চট্টগ্রাম', bloodGroup: 'B+', lastDonation: '১ মাস আগে', avatarUrl: 'https://picsum.photos/seed/2/100/100' },
    { id: 3, name: 'সাইফুল ইসলাম', location: 'গুলশান, ঢাকা', bloodGroup: 'B-', lastDonation: '২ দিন আগে', avatarUrl: 'https://picsum.photos/seed/3/100/100' },
];

const PopularDonorCard: React.FC<{ donor: Record<string,any> }> = ({ donor }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-0 hover:bg-gray-100 even:bg-red-50/20 ">
        <div className="flex items-center space-x-3">
            <img src={donor.avatarUrl} alt={donor.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <p className="font-semibold text-gray-800">{donor.name}</p>
                <p className="text-sm text-gray-500">{donor.location}</p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <span className="bg-red-100 text-red-700 font-bold text-sm px-3 py-1 rounded-full">{donor.bloodGroup}</span>
            <p className="text-sm text-gray-600 hidden sm:block">{donor.lastDonation}</p>
            <button className="bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                যোগাযোগ
            </button>
        </div>
    </div>
);


const PopularDonors: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">জনপ্রিয় ডোনার ও মনোনীত ব্যক্তি</h2>
            <div className="space-y-2">
                {popularDonors.map(donor => <PopularDonorCard key={donor.id} donor={donor} />)}
            </div>
        </div>
    );
};

export default PopularDonors;
