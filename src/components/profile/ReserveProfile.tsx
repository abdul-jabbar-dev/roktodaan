import React from 'react';
import Image from 'next/image';
import { Check, LocateFixedIcon, LocateIcon, PhoneIcon } from 'lucide-react';
import { BloodRequest, Donation } from '@/types/request/type';
import getFormattedAddress from '@/utils/Addressformet';
import getDefaultImg from '@/utils/DefaultImg';
import Link from 'next/link';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';

interface ReserveProfileProps {
    donation: Donation;
    setSelectedRequest: React.Dispatch<React.SetStateAction<BloodRequest | null>>
}

const ReserveProfile: React.FC<ReserveProfileProps> = ({ donation }) => {
    const reserved = donation.reserved;

    const name =
        reserved?.otherName || reserved?.donor?.profile.fullName || 'Unknown';
    const address =
        reserved?.otherAddress || getFormattedAddress(reserved?.donor) || 'N/A';
    const phoneNumber =
        reserved?.otherPhoneNumber || reserved?.donor?.profile?.phoneNumber || '';
    const email = reserved?.donor?.profile?.email || '';
    const gender = (reserved?.donor?.gender as 'male' | 'female') || 'male';
    const profileImg =
        reserved?.donor?.profile?.img || getDefaultImg(gender);

    return (
        <div className="bg-white border border-white shadow-lg rounded-xl p-4">
          
            <div className="flex-none sm:flex">
                {/* Profile Image */}
                <div className="relative h-32 w-32 sm:mb-0 mb-3">
                    <Image
                        width={300}
                        height={300}
                        src={profileImg}
                        alt={name}
                        className="w-32 h-32 object-cover rounded-lg"
                    />
                </div>

                {/* Info Section */}
                <div className="flex-auto sm:ml-5">
                    {/* Name & Contact */}
                    <div className="flex items-center justify-between sm:mt-2">
                        <div className="flex flex-col">
                            <Link href={'donor/' + reserved?.donor?.id} className="text-lg font-bold text-gray-800">{name}</Link>
                            <div className="text-gray-500 text-sm flex flex-wrap gap-2 mt-1">
                                {phoneNumber && <span>{phoneNumber}</span>}
                                {email && (
                                    <>
                                        <span className="border-r border-gray-200 mx-1" />
                                        <span>{email}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address & Actions */}
                    <div className="flex flex-wrap items-center pt-3 text-sm text-gray-600 gap-3">
                        {/* Address */}
                        <div className="flex items-center flex-1 min-w-[200px]">
                            <LocateIcon className="h-5 w-5 mr-2 shrink-0" />
                            <p className="truncate">{address}</p>
                        </div>

                        {/* Dummy Info */}
                        <div className="flex items-center flex-1 min-w-[150px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                />
                            </svg>
                            <p>14 Components</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <a
                                className="btn bg-white rounded-lg text-gray-600 flex items-center gap-1 px-3 py-1 border"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                            >
                                <LocateFixedIcon className="w-5 h-5" />
                                ঠিকানা দেখুন
                            </a>

                            {phoneNumber && (
                                <a
                                    href={`tel:${phoneNumber}`}
                                    rel="noopener noreferrer"
                                    className="btn bg-white rounded-lg text-gray-600 flex items-center gap-1 px-3 py-1 border"
                                >
                                    <PhoneIcon className="w-5 h-5" />
                                    ফোন করুন
                                </a>
                            )}
                            <a
                                href={`tel:${phoneNumber}`}
                                rel="noopener noreferrer"
                                className="btn bg-blue-600 text-white rounded-lg flex items-center gap-1 px-3 py-1 border"
                            >
                                <Check className="w-5 h-5" />
                                ডোনেশন সম্পন্ন হয়েছে
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReserveProfile;
