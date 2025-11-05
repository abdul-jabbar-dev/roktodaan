
import React from 'react';  
import BloodGroup from '@/types/blood/group';



  const AlertTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);
  const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


interface BloodRequest {
    id: number;
    patientName: string;
    bloodGroup: BloodGroup;
    location: string;
    timeAgo: string;
    isEmergency: boolean;
}

const requests: BloodRequest[] = [
    { id: 2, patientName: "জরুরী প্রয়োজন", bloodGroup: 'A+', location: "স্কয়ার হাসপাতাল", timeAgo: "১৫ মিনিট আগে", isEmergency: true },
    { id: 1, patientName: "রোগীর জন্য", bloodGroup: 'B+', location: "ঢাকা মেডিকেল", timeAgo: "৫ মিনিট আগে", isEmergency: false },
    { id: 4, patientName: "খুব জরুরী", bloodGroup: 'A-', location: "ল্যাবএইড, ঢাকা", timeAgo: "২০ মিনিট আগে", isEmergency: true },
    { id: 3, patientName: "রক্ত প্রয়োজন", bloodGroup: 'B+', location: "চট্টগ্রাম মেডিকেল", timeAgo: "১ ঘন্টা আগে", isEmergency: false },
];

const BloodRequestCard: React.FC<{ request: BloodRequest }> = ({ request }) => (
    <div className={`p-4 border-b last:border-0 hover:bg-gray-50 transition-colors duration-200 ${request.isEmergency ? 'bg-red-50 border-l-4 border-red-500' : ''}`}>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-red-700 font-bold">{request.bloodGroup}</span>
                </div>
                <div>
                    <p className="font-semibold text-gray-800 flex items-center">
                        {request.patientName}
                        {request.isEmergency && <AlertTriangleIcon className="w-4 h-4 text-red-500 ml-2" />}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                        <LocationMarkerIcon className="w-4 h-4 mr-1" />
                        <span>{request.location}</span>
                    </div>
                </div>
            </div>
            <p className="text-xs text-gray-500 ml-2 text-right flex-shrink-0">{request.timeAgo}</p>
        </div>
        <button className="w-full mt-3 bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition duration-300">
            বিস্তারিত দেখুন
        </button>
    </div>
);


const BloodRequests: React.FC = () => {
    const sortedRequests = [...requests].sort((a, b) => (b.isEmergency ? 1 : 0) - (a.isEmergency ? 1 : 0));

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">জরুরী রক্তের আবেদন</h2>
            <div className="space-y-2">
                {sortedRequests.map(req => <BloodRequestCard key={req.id} request={req} />)}
            </div>
        </div>
    );
};

export default BloodRequests;