
import React from 'react'; 

interface Campaign {
    id: number;
    title: string;
    location: string;
    date: string;
    imageUrl: string;
}



  const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

  const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);


const campaigns: Campaign[] = [
    { id: 1, title: 'ঢাকা বিশ্ববিদ্যালয় রক্তদান কর্মসূচী', location: 'টিএসসি, ঢাকা বিশ্ববিদ্যালয়', date: 'আগস্ট ৩০, ২০২৪', imageUrl: 'https://picsum.photos/seed/101/400/200' },
    { id: 2, title: '"জীবন বাঁচান" ক্যাম্পেইন', location: 'ধানমন্ডি লেক, ঢাকা', date: 'সেপ্টেম্বর ১৫, ২০২৪', imageUrl: 'https://picsum.photos/seed/102/400/200' },
    { id: 3, title: 'মেগা ব্লাড ড্রাইভ', location: 'বসুন্ধরা সিটি, ঢাকা', date: 'অক্টোবর ৫, ২০২৪', imageUrl: 'https://picsum.photos/seed/103/400/200' },
];

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-32 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800">{campaign.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                    <LocationMarkerIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{campaign.location}</span>
                </div>
                <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{campaign.date}</span>
                </div>
            </div>
            <button className="w-full mt-4 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-300">
                অংশগ্রহণ করুন
            </button>
        </div>
    </div>
);


const Campaigns: React.FC = () => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">আগত রক্তদান ক্যাম্পেইন</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {campaigns.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} />)}
            </div>
        </section>
    );
};

export default Campaigns;
