'use client'
import React, { useState, useRef, useEffect } from 'react';
import { DonorInfo } from '@/types/user/user';
import { mapBloodGroupEnumToLabel } from '@/utils/BloodGroupFormet';
import { getLastDonationDate } from '@/utils/DateFormet';
import Image from 'next/image';
import getDefaultImg from '@/utils/DefaultImg';
import { useRouter } from 'next/navigation'
interface DonorModalProps {
  donor: DonorInfo;
  trigger: React.ReactNode;
}

export const DonorModal: React.FC<DonorModalProps> = ({ donor, trigger }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  useEffect(() => {
    if (open) {
      // disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // enable scroll
      document.body.style.overflow = '';
    }

    return () => {
      // cleanup in case component unmounts
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!donor) return null;

  const handleRoute = () => {

    router.push('/donor/' + donor.id); // Navigates to /dashboard and adds to history 
  };
  return (
    <>
      {/* Parent decides the trigger */}
      <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center text-start bg-opacity-50 z-50 justify-center scroll-none p-4 transition-opacity duration-300  bg-black/60">

          <div ref={modalRef} className="relative w-full max-w-4xl p-4 overflow-y-scroll">

            <div className="bg-white rounded-lg shadow-lg overflow-y-scroll "
              style={{
                maxHeight: `calc(var(--spacing) * 160)`,
              }}>
              <div className="p-6 sm:p-8 max-w-4xl  ">

                <div className="h-full">
                  <div className="flex flex-col sm:flex-row gap-6 mb-8">
                    <Image src={donor?.profile?.img || getDefaultImg(donor.profile.gender as "male" | "female")} alt={donor.profile.fullName||"Donor Name"} height={90} width={90} className="w-24 h-24 rounded-full object-cover border-4 border-red-200 shadow-md" />
                    <div>
                      <div className="flex gap-x-2 ">
                        <h2 id=" donor-details-title" className="text-3xl font-bold text-gray-800">{donor.profile.fullName}</h2>
                        <span className="bg-red-100 text-red-700 font-bold text-md px-3 pt-1  rounded-full">{mapBloodGroupEnumToLabel(donor.profile.bloodGroup)}</span>
                      </div>
                      <p className="text-gray-600 mt-3">আমি আনুমানিক {donor.donationExperience.length} বার রক্ত দিয়েছি</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-600 border-b border-gray-200  pb-2 mb-4">যোগাযোগের তথ্য</h3>
                      <div className="space-y-3 text-gray-600">
                        <p>
                          <span className="text-sm text-gray-600 font-semibold">মোবাইল:</span>{' '}
                          {donor?.profile?.phoneNumber?.slice(0, 3) + '****' + donor?.profile?.phoneNumber?.slice(-3)}
                        </p>
                        <p><span className=" text-sm text-gray-600 font-semibold">ইমেইল:</span> {donor.profile.email}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-600 border-b border-gray-200  pb-2 mb-4">অন্যান্য তথ্য</h3>
                      <p className="text-gray-600 text-sm">{donor.profile.fullName}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-600 border-b border-gray-200  pb-2 mb-4">জরুরী যোগাযোগের তথ্য</h3>
                      <div className="space-y-3 text-gray-600">
                        <p><span className=" text-sm text-gray-600 font-semibold">মোবাইল:</span> {donor.profile.phoneNumber}</p>
                        <p><span className=" text-sm text-gray-600 font-semibold">ইমেইল:</span> {donor.profile.email}</p>
                        <p><span className=" text-sm text-gray-600 font-semibold">ঠিকানা:</span> {
                          donor.address.area
                            ? `${donor.address.area}, ${donor.address.upazila}, ${donor.address.division}`
                            : donor.address.upazila + ", " + donor.address.division}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-600 border-b border-gray-200  pb-2 mb-4">ডোনেশনের তথ্য</h3>
                      <div className="space-y-3 text-gray-600">
                        <p><span className=" text-sm text-gray-600 font-semibold">শেষ ডোনেশন: </span> {getLastDonationDate(donor)}</p>
                        <p><span className=" text-sm text-gray-600 font-semibold">পরবর্তী সম্ভাব্য ডোনেশন:</span> No</p>
                        <p className="text-sm">তিনি নির্দিষ্ট সময় রক্ত প্রদান করেন এবং তার রক্ত সম্পূর্ণ নিরাপদ।</p>
                      </div>
                    </div>
                  </div>


                </div>

                <div className="mt-8 flex  flex-row justify-end gap-4 h-max  ">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gray-200 text-xs text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-300"
                  >
                    বন্ধ করুন
                  </button>
                  <button onClick={handleRoute} className="w-full sm:w-auto px-6 py-2.5 text-xs bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300">
                    যোগাযোগ করুন
                  </button>
                </div>
              </div>


            </div>
          </div>
        </div >
      )}
    </>
  );
};
