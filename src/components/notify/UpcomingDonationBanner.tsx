import React, { useEffect, useState } from 'react';
import { UserState } from '@/redux/slice/userSlice';
import ClientDate from '@/utils/DateFormet';
import API from '@/api';

export interface UpcomingDonation {
  id: string;
  donorId: string;
  donationId: string;
  otherName: string | null;
  otherPhoneNumber: string | null;
  otherAddress: string | null;
  createdAt: string;
  updatedAt: string;
  donation: {
    id: string;
    bloodRequestId: string;
    bloodType: string;
    date: string;
    place: string;
    status: string;
    bloodRequest: {
      id: string;
      userId: string;
      attendantName: string;
      patientName: string;
      bloodGroup: string;
      hospital: string;
      district: string;
      division: string;
      upazila: string;
      urgency: string;
      contact: string;
      reason: string;
      donorMessage: string;
      postedAt: string;
    };
  };
}

export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

interface UpcomingDonationBannerProps {
  user: UserState;
}

const UpcomingDonationBanner: React.FC<UpcomingDonationBannerProps> = ({ user }) => {
  const [data, setData] = useState<UpcomingDonation | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchUpcomingDonation = async () => {
      try {
        const response = await API.request.getUpcommingDonation(user.id as string);
        const upcomingDonation = (response as any).data.data?.[0]||{};
        setData(upcomingDonation&&upcomingDonation.id || null);
      } catch (error) {
        console.error('Failed to fetch upcoming donation:', error);
      }
    };

    fetchUpcomingDonation();
  }, [user]);

  useEffect(() => { 
  if (!data?.donation?.date) return; 

  const donationDate = new Date(data.donation.date);

  const updateTimeLeft = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const donationDay = new Date(donationDate.getFullYear(), donationDate.getMonth(), donationDate.getDate());

    if (today.getTime() > donationDay.getTime()) {
      setIsExpired(true);
      return;
    }

    const diff = donationDate.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft(
        `সময় হয়ে গেছে — আজই আপনার রক্তদানের দিন ❤️ যোগাযোগ করুন: ${data.donation.bloodRequest.attendantName} (${data.donation.bloodRequest.contact})`
      );
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    let display = "";
    if (days > 0) display += `${days} দিন `;
    if (hours > 0) display += `${hours} ঘন্টা `;
    if (minutes > 0) display += `${minutes} মিনিট `;

    setTimeLeft(`আর মাত্র ${display.trim()} বাকি!`);
  };

  // ✅ Run immediately
  updateTimeLeft();

  const interval = setInterval(updateTimeLeft, 60 * 1000);

  return () => clearInterval(interval);
}, [data]);


  // 🚫 Completely hide if expired or no data
  if (!data || isExpired) return null;

  const { donation } = data;
  const { bloodRequest } = donation;
  const formattedDate = ClientDate({ dateString: donation.date });

  return (
    <div className="bg-red-100 border-b-2 border-red-200 text-red-800 animate-fade-in-scale">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <BellIcon className="w-5 h-5 mr-3 animate-pulse" />
          <div className="text-sm font-medium leading-snug">
            <p>
              🩸 <strong>রক্তদানের নোটিশ:</strong> আপনার রক্তদানের দিন ঘনিয়ে এসেছে!
              আপনি <strong>{bloodRequest.patientName}</strong> এর জন্য
              <strong> {bloodRequest.hospital}</strong> এ 
              <strong> {formattedDate}</strong> তারিখে 
              <strong> {donation.bloodType}</strong> রক্ত দান করবেন।
            </p>
            <p className="mt-1 font-semibold text-red-700">{timeLeft}</p>
          </div>
        </div>
        <button
          className="text-red-900 hover:bg-red-200 rounded-full p-1"
          aria-label="Dismiss notification"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UpcomingDonationBanner;
