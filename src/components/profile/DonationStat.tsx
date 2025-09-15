import { UserState } from '@/redux/slice/userSlice';
import { MapPin, MessageCircle } from 'lucide-react';
import React from 'react';

const DonationStat = ({
  user,
  rootEdit,
}: {
  user: UserState;
  rootEdit: boolean;
}) => {
  const bloodMap: Record<string, string> = {
    A_POS: 'A+',
    A_NEG: 'A-',
    B_POS: 'B+',
    B_NEG: 'B-',
    O_POS: 'O+',
    O_NEG: 'O-',
    AB_POS: 'AB+',
    AB_NEG: 'AB-',
  };

  const lastDonation = user?.donationExperience
    ?.slice()
    ?.sort(
      (a, b) =>
        new Date(b.lastDonationDate).getTime() -
        new Date(a.lastDonationDate).getTime()
    )[0];

  const lastDonationDate = lastDonation?.lastDonationDate
    ? new Date(lastDonation.lastDonationDate).toLocaleDateString()
    : 'No Date';

  return (
    <div className="bg-gray-50 border border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-sm w-full md:w-1/2">
      {/* Header */}
      <div className="flex items-center mb-2">
        <MessageCircle className="h-4 w-4 mr-2 text-gray-600" />
        <h3 className="font-semibold text-md">Donation Statistic</h3>
      </div>

      <div className="stats w-full mx-auto">
        <div className="stat place-items-center">
          <div className="stat-title">Blood Group</div>
          <div className="stat-value text-secondary">
            {bloodMap[user?.profile?.bloodGroup] || 'Unknown'}
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Donation</div>
          <div className="stat-value">
            {user?.donationExperience?.length || 0}
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Last Donation</div>
          <div className="stat-value">{lastDonationDate}</div>
          <div className="stat-desc flex gap-x-1 items-center">
            <MapPin className="w-3" />
            {lastDonation?.lastDonationLocation || 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationStat;
