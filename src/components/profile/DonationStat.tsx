import { MessageCircle } from 'lucide-react';
import React from 'react';

const DonationStat = () => {
    return (
        <div className="bg-gray-50 border border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-sm w-1/2 ">
            {/* Header */}
            <div className="flex items-center mb-2">
                <MessageCircle className="h-4 w-4 mr-2 text-gray-600" />
                <h3 className="font-semibold text-md">Number Verification</h3>
            </div>

            <div className="stats  ">
                <div className="stat place-items-center">
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">From January 1st to February 1st</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary">4,200</div>
                    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
}

export default DonationStat;
