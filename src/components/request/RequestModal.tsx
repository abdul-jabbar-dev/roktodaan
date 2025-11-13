'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { BloodRequest, Donation, DonationStatus } from '@/types/request/type';
import { mapBloodGroupEnumToLabel } from '@/utils/BloodGroupFormet';
import { mapStatus } from '@/utils/DontaionStatusFormet';
import WechatIcon from '@rsuite/icons/Wechat';

import PlusIcon from '@rsuite/icons/Plus';
import { useMakeAppoinmentRequestMutation } from '@/redux/services/request';
import { UserState } from '@/redux/slice/userSlice';
import { useSelector } from 'react-redux';
import getFormattedAddress from '@/utils/Addressformet';
/* ---------------- ICONS ---------------- */
const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const BloodDropIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C7.58 2 4 5.58 4 10c0 2.43 1.09 4.62 2.81 6.13L12 22l5.19-5.87C18.91 14.62 20 12.43 20 10c0-4.42-3.58-8-8-8z" />
  </svg>
);

const HealthIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const LocationMarkerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

/* Blood bag icon: color controlled by isSelected via text-color classes + fill="currentColor" */
const BloodBagIcon: React.FC<{ className?: string; isSelected: boolean; onClick: () => void; }> = ({ className = '', isSelected, onClick }) => (
  <svg
    className={`${className} cursor-pointer transition-colors duration-300 ${isSelected ? 'text-red-500' : 'text-red-200'}`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    aria-pressed={isSelected}
    role="button"
  >
    {/* main bag filled by currentColor */}
    <path
      d="M12 3.5C6.5 3.5 4 6 4 10V17C4 20 6.5 22.5 12 22.5C17.5 22.5 20 20 20 17V10C20 6 17.5 3.5 12 3.5Z"
      fill="currentColor"
    />
    {/* accents keep white for contrast */}
    <path d="M12 18V22.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 2H15" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 2V3.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 7.5C11.1716 7.5 10.5 8.17157 10.5 9V11C10.5 11.8284 11.1716 12.5 12 12.5C12.8284 12.5 13.5 11.8284 13.5 11V9C13.5 8.17157 12.8284 7.5 12 7.5Z" fill="white" />
    <path d="M12 12.5V15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9.5 12.5H14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* Blood bag icon: color controlled by isSelected via text-color classes + fill="currentColor" */
const TickIcon: React.FC<{ className?: string; onClick: () => void; }> = ({ className = '', onClick }) => (
  <svg className={`${className} cursor-pointer transition-colors duration-300 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24px"><linearGradient id="HoiJCu43QtshzIrYCxOfCa" x1="21.241" x2="3.541" y1="39.241" y2="21.541" gradientUnits="userSpaceOnUse"><stop offset=".108" stopColor="#0d7044" /><stop offset=".433" stopColor="#11945a" /></linearGradient><path fill="url(#HoiJCu43QtshzIrYCxOfCa)" d="M16.599,41.42L1.58,26.401c-0.774-0.774-0.774-2.028,0-2.802l4.019-4.019	c0.774-0.774,2.028-0.774,2.802,0L23.42,34.599c0.774,0.774,0.774,2.028,0,2.802l-4.019,4.019	C18.627,42.193,17.373,42.193,16.599,41.42z" /><linearGradient id="HoiJCu43QtshzIrYCxOfCb" x1="-15.77" x2="26.403" y1="43.228" y2="43.228" gradientTransform="rotate(134.999 21.287 38.873)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2ac782" /><stop offset="1" stopColor="#21b876" /></linearGradient><path fill="url(#HoiJCu43QtshzIrYCxOfCb)" d="M12.58,34.599L39.599,7.58c0.774-0.774,2.028-0.774,2.802,0l4.019,4.019	c0.774,0.774,0.774,2.028,0,2.802L19.401,41.42c-0.774,0.774-2.028,0.774-2.802,0l-4.019-4.019	C11.807,36.627,11.807,35.373,12.58,34.599z" /></svg>
);
const PendingIcon: React.FC<{ className?: string; onClick: () => void }> = ({ className = '', onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.88 122.88"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#FF7900"
      d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44C27.51,122.88,0,95.37,0,61.44
          C0,27.51,27.51,0,61.44,0z M54.22,37.65c0-9.43,14.37-9.44,14.37,0.02v25.75l16.23,8.59c0.08,0.04,0.16,0.09,0.23,0.15
          l0.14,0.1c7.54,4.94,0.53,16.81-7.53,12.15l-0.03-0.02L57.99,73.87c-2.3-1.23-3.79-3.67-3.79-6.29l0.01,0L54.22,37.65z"
    />
  </svg>
);


const CrossIcon: React.FC<{ className?: string; onClick?: () => void }> = ({ className = '', onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.88 122.881"
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    <g>
      <path
        fill="#D8453E"
        d="M61.44,0c16.963,0,32.324,6.879,43.443,17.997c11.118,11.118,17.996,26.48,17.996,43.443 
            c0,16.963-6.878,32.325-17.996,43.443c-11.119,11.118-26.48,17.997-43.443,17.997c-16.963,0-32.325-6.879-43.443-17.997 
            S0,78.403,0,61.44c0-16.963,6.879-32.325,17.997-43.443S44.477,0,61.44,0z"
      />
    </g>
  </svg>
);

/* ---------------- HELPERS ---------------- */
const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string | React.ReactNode }> = ({ icon, label, value }) => (
  <div className="flex items-start py-2">
    <div className="w-6 h-6 mr-3 text-red-500 flex-shrink-0">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="font-semibold text-gray-800">{value}</div>
    </div>
  </div>
);

interface RequestModalProps {
  request: BloodRequest;
  trigger: React.ReactNode;
}



/* ---------------- MAIN COMPONENT ---------------- */
export const RequestModal: React.FC<RequestModalProps> = ({ request, trigger }) => {

  const [selectedUnits, setSelectedUnits] = useState<{ bloodRequestId: string, donorName?: string, donorPhoneNumber?: string, donorAddress?: string, isSelf?: boolean | undefined }[]>([]);
  const [makeAppoinment, { }] = useMakeAppoinmentRequestMutation()
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const reduxUser = useSelector(({ user }: { user: UserState }) => user)
  // update a field for a specific selected unit by bloodRequestId
  const handleOtherDonorChange = (id: string, field: 'donorName' | 'donorPhoneNumber' | 'donorAddress', value: string) => {
    setSelectedUnits(prev =>
      prev.map(unit =>
        unit.bloodRequestId === id
          ? { ...unit, [field]: value }
          : unit
      )
    );
  };
 
  useEffect(() => {
    if (selectedUnits.length === 1) {
      const newUnitData = {
        bloodRequestId: selectedUnits[0].bloodRequestId,
        donorName: reduxUser.profile.fullName,
        donorPhoneNumber: reduxUser.profile.phoneNumber,
        donorAddress: getFormattedAddress(reduxUser),
        isSelf: true
      };

      const currentUnit = selectedUnits[0];

      if (!currentUnit.isSelf || currentUnit.donorName !== newUnitData.donorName) {

        setSelectedUnits([newUnitData]);
      }
    }
  }, [selectedUnits, reduxUser])

  const getStatusFeedback = (donation: Donation) => {
    if (donation.status === DonationStatus.Upcomming) {
      return <PlusIcon
        key={donation.id}
        className="w-5 h-5 mr-2 text-red-500 flex-shrink-0"

      />
    } else if (donation.status === DonationStatus.Done) {
      return <TickIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" onClick={() => { }} />
    } else if (donation.status === DonationStatus.Reserved) {
      return <PendingIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" onClick={() => { }} />
    } else if (donation.status === DonationStatus.NoNeed) {
      return <CrossIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" onClick={() => { }} />
    }
  }
  const selectBags = (donation: Donation) => {
    if (donation.status === DonationStatus.Upcomming) {

      setSelectedUnits(prev => {
        const exists = prev.some(d => d.bloodRequestId === donation.id);
        if (exists) {
          // unselect
          return prev.filter(d => d.bloodRequestId !== donation.id);
        }
        // select new
        return [
          ...prev,
          {
            bloodRequestId: donation.id,
            donorName: '',
            donorPhoneNumber: '',
            donorAddress: ''
          }
        ];
      });



    }

  }




  const handleRoute = () => {

    const finalRequests = selectedUnits.map(unit => {
      if (unit.isSelf) {
        return {
          ...unit,
          isSelf: reduxUser.id
        };
      }
      return unit;
    });
    makeAppoinment({ request: finalRequests, requestId: request.id });

    // setOpen(false); 
  };


  if (!request) return null;

  return (
    <>
      <div onClick={() => setOpen(true)} className="inline-block">
        {trigger}
      </div>

      {open && typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8">
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              className="relative bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] p-8 transition-all"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>

              {/* আবেদন বিবরণ */}
              <section className="my-6 p-4">
                <h3 className="mb-3 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-800">
                  আবেদনের বিবরণ
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  <InfoRow icon={<UserIcon />} label="রোগীর নাম" value={request.patientName} />
                  <InfoRow icon={<BloodDropIcon />} label="রক্তের গ্রুপ" value={mapBloodGroupEnumToLabel(request.bloodGroup)} />

                  <InfoRow icon={<PhoneIcon />} label="যোগাযোগ" value={request.contact} />
                  <InfoRow icon={<UserIcon />} label="অ্যাটেনডেন্ট" value={request.attendantName} />
                  {request?.hospital && (
                    <InfoRow icon={<LocationMarkerIcon />} label="হসপিটাল" value={request.hospital} />
                  )}
                  <InfoRow icon={<HealthIcon />} label="কারণ" value={request.reason} />

                </div>
                {request.donorMessage && <InfoRow icon={<WechatIcon className="w-5 h-5" />} label="দাতাদের জন্য বার্তা" value={request.donorMessage} />}
                <div className="mt-4 border-t border-gray-400 pt-3">
                  <h4 className="font-semibold text-gray-700 mb-2">প্রয়োজনীয় ডোনেশন:</h4>
                  <div className="flex items-start flex-col space-x-2">
                    {request.donations.map((donation) => (
                      <div className="flex gap-2 items-center mb-3" key={donation.id}>
                        <li className="flex items-center text-gray-600 list-none">
                          {getStatusFeedback(donation)}
                          <span className={`${(donation.status === DonationStatus.NoNeed || donation.status === DonationStatus.Done) && "line-through opacity-75"}`}>
                            <strong>ব্যাগ:</strong> {new Date(donation.date).toLocaleDateString("bn-BD")} - <strong>স্থান:</strong> {donation.place}
                          </span>
                          <span className="ml-3 text-sm text-gray-500 mr-2 ">{mapStatus(donation.status, 'donation')}</span>
                          {donation.status === DonationStatus.Reserved && donation?.reserved?.otherName || (donation?.reserved?.donor as any)?.profile?.fullName }

                          {donation.status === DonationStatus.Upcomming && (
                            <BloodBagIcon
                              className="w-8 h-8  text-gray-400 flex-shrink-0"
                              isSelected={selectedUnits.some(s => s.bloodRequestId === donation.id)}
                              onClick={() => selectBags(donation)}
                            />
                          )}
                        </li>
                      </div>
                    ))}

                  </div>
                </div>
              </section>

              {/* ডোনার ইনপুটগুলি */}
              {selectedUnits.length > 0 ? <section className="space-y-4 mt-6">
                {selectedUnits.map((donor, i) => {
                  const donation = request.donations.find(d => d.id === donor.bloodRequestId);
                  if (!donation) return null;

                  return (
                    <div key={i} className="p-4 border rounded-lg bg-gray-50 border-gray-300 relative">
                      {donor.isSelf && <div className="flex absolute right-4 w-24 justify-center items-center m-1 font-medium p-1 rounded-full text-red-700 bg-red-100 border border-red-300 ">
                        <div slot="avatar">
                          <div className="flex relative w-6 h-6 bg-red-500 justify-center items-center m-1 mr-2 ml-0 my-0 text-xs rounded-full">
                            <img className="rounded-full" alt="A" src="https://randomuser.me/api/portraits/women/68.jpg" /> </div>
                        </div>
                        <div className="text-xs font-normal leading-none max-w-full flex-initial">
                          আমি নিজে</div>
                      </div>}
                      <h3 className="font-semibold text-gray-700 mb-3">
                        ডোনার #{i + 1} এর বিবরণ
                      </h3>
                      <div className="mb-2 text-sm text-gray-600">
                        <p>
                          <strong>তারিখ:</strong>{" "}
                          {new Date(donation.date).toLocaleDateString("bn-BD")}
                        </p>
                        <p>
                          <strong>স্থান:</strong> {donation.place}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          disabled={donor.isSelf}
                          placeholder="ডোনারের নাম"
                          value={donor.donorName ?? ''}
                          onChange={(e) => handleOtherDonorChange(donor.bloodRequestId, 'donorName', e.target.value)}
                          className="w-full text-sm bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-1 disabled:opacity-70 disabled:cursor-not-allowed focus:ring-red-500 outline-none"
                        />
                        <input
                          type="tel"
                          placeholder="ডোনারের ফোন নম্বর"
                          value={donor.donorPhoneNumber ?? ''}
                          onChange={(e) => handleOtherDonorChange(donor.bloodRequestId, 'donorPhoneNumber', e.target.value)}
                          className="w-full text-sm bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-red-500 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="ডোনারের ঠিকানা (ঐচ্ছিক)"
                          value={donor.donorAddress ?? ''}
                          onChange={(e) => handleOtherDonorChange(donor.bloodRequestId, 'donorAddress', e.target.value)}
                          className="w-full text-sm bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-red-500 outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </section> : <div className="text-center  w-full text-gray-600  ">রক্তদানের অ্যাপয়েন্টমেন্ট সেট করা হয়নি</div>}

              {/* অ্যাকশন বাটন */}
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gray-200 text-xs text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  বন্ধ করুন
                </button>
                <button
                  onClick={handleRoute}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  ডোনেশন নিশ্চিত করুন
                </button>
              </div>
            </div>
          </div>
          ,
          document.body
        )}
    </>
  );
};
