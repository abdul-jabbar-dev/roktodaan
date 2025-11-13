
import { BloodRequest, DonationStatus, RequestStatus } from '@/types/request/type';
import { RequestModal } from './RequestModal';
import { mapBloodGroupEnumToLabel } from '@/utils/BloodGroupFormet';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('bn');
export const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);

export const BloodDropIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7.58 2 4 5.58 4 10c0 2.43 1.09 4.62 2.81 6.13L12 22l5.19-5.87C18.91 14.62 20 12.43 20 10c0-4.42-3.58-8-8-8z" />
    </svg>
);
export const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg width="16px" height="16px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet">
        <path d="M5.9 62c-3.3 0-4.8-2.4-3.3-5.3L29.3 4.2c1.5-2.9 3.9-2.9 5.4 0l26.7 52.5c1.5 2.9 0 5.3-3.3 5.3H5.9z" fill="#ffce31">
        </path>
        <g fill="#231f20">
            <path d="M27.8 23.6l2.8 18.5c.3 1.8 2.6 1.8 2.9 0l2.7-18.5c.5-7.2-8.9-7.2-8.4 0">
            </path>
            <circle cx="32" cy="49.6" r="4.2">
            </circle>
        </g>
    </svg>
);

interface BloodRequestCardProps {
    request: BloodRequest;
}
const BloodRequestCard: React.FC<BloodRequestCardProps> = ({ request }) => {
    const statusStyles: { [key in RequestStatus]: string } = {
        [RequestStatus.VeryUrgent]: 'bg-red-600 text-white',
        [RequestStatus.Urgent]: 'border-red-400 border  text-red-600 text-gray-600',
        [RequestStatus.Needed]: ' border-gray-300 border text-gray-600 ',
    };
    const statusBorderStyles: { [key in RequestStatus]: string } = {
        [RequestStatus.VeryUrgent]: 'border-red-300 bg-red-50',
        [RequestStatus.Urgent]: 'border-red-300',
        [RequestStatus.Needed]: 'border-gray-300',
    };

    const firstDonation = request.donations[0];
    const totalBags = request.donations.length;

    return (
        <div className={`  rounded-lg shadow-md p-5 border border-gray-100 flex flex-col justify-between ${statusBorderStyles[request.urgency]} `}>
            <div>
                <div className="flex justify-between items-start mb-3">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusStyles[request.urgency]} flex gap-x-2 item-center`}>
                        {request.urgency} {request.urgency === RequestStatus.VeryUrgent && <WarningIcon />}
                    </span>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-red-600">{mapBloodGroupEnumToLabel(request.bloodGroup)}</p>

                    </div>
                </div>
                <h3 className="font-bold text-xl text-gray-800">{request.patientName}</h3>
                <p className="text-sm text-gray-600 mb-3">প্রয়োজন:<strong className='text-lg'>  {totalBags}</strong> ব্যাগ রক্ত (বাকি: {request.donations.filter(b => b.status === DonationStatus.Upcomming).length} ব্যাগ) </p>
                <div className=" mb-2 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className=' text-gray-600 text-md'><strong>রক্ত দেয়ার তারিখ:</strong> {new Date(firstDonation.date).toLocaleDateString('bn-BD')}</span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 border-t pt-3">
                    <div className="flex items-center">
                        <LocationMarkerIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>হসপিটাল:</strong> {request.hospital}</span>
                    </div>
                    <div className="flex items-center">
                        <LocationMarkerIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>স্থান:</strong> {firstDonation?.place}</span>
                    </div>

                    <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>পোস্ট:</strong> {dayjs(new Date(request.postedAt)).fromNow()}</span>
                    </div>
                </div>
            </div>

            <RequestModal
                request={request}
                trigger={
                    <button className="w-full mt-4 bg-red-600  cursor-pointer text-white font-semibold py-2.5 rounded-md hover:bg-red-700 transition duration-300">
                        সাহায্য করুন
                    </button>
                }
            />
        </div>
    );
};

export default BloodRequestCard