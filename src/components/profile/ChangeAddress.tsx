'use client'
import { useLocationSelect } from '@/hooks/useLocationSelect';
import { MapPinCheckIcon, Pencil, RefreshCcw } from 'lucide-react';
import React, { useState } from 'react';
import { updateAddress, UserState } from '@/redux/slice/userSlice';
import { Location } from '@/types/location/destination';
import API from '@/api';
import { useDispatch } from 'react-redux';

const ChangeAddress = ({ user, rootEdit }: { user: UserState, rootEdit: boolean }) => {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [area, setArea] = useState(user.address?.area || "");

    const {
        division,
        district,
        upazila,
        selectedDivision,
        setSelectedDivision,
        selectedDistrict,
        setSelectedDistrict,
        selectedUpazila,
        setSelectedUpazila
    } = useLocationSelect(user.address);

    const saveUpdate = async () => {
        const updatedAddress: Location = {
            area,
            division: (selectedDivision?.name) as string,
            district: (selectedDistrict?.name) as string,
            upazila: (selectedUpazila?.name) as string,
        };

        // Redux এ save করুন 
        const res = await API.user.updateLocation(updatedAddress)
        dispatch(updateAddress(res?.data?.address))
        setEdit(false);
    };

    return (
        <div className="bg-gray-50 p-3 shadow-sm rounded-xl relative">
            {/* Title */}
            <div className="flex items-center space-x-2 font-semibold text-gray-800 leading-8 mb-3">
                <span className="text-gray-600">
                    <MapPinCheckIcon className="h-[18px]" />
                </span>
                <span className="tracking-wide">Address</span>
            </div>

            {/* Form Grid */}
            <div className="text-gray-700 text-sm space-y-3">
                <div className="flex justify-between">
                    {/* Area */}
                    <div className="grid grid-cols-2 gap-3 items-center  w-full">
                        <label className="text-gray-700 font-medium ml-4">এলাকা</label>
                        {edit ? (
                            <input
                                type="text"
                                placeholder="যেমনঃ ৫৮, সোঁনারগাও জনপথ, সেক্টর #১১, উত্তরা, ঢাকা"
                                value={area || user.address?.area || ""}
                                onChange={(e) => setArea(e.target.value)}
                                className="border  border-gray-300 input input-sm rounded-xl py-1 px-3 
               focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
                            />
                        ) : (
                            <span className="ml-2">{user.address?.area}</span>
                        )}
                    </div>

                    {/* Upazila */}
                    <div className="grid grid-cols-2 gap-3 items-center  w-full">
                        <label className="text-gray-700 font-medium ml-4">উপজেলা *</label>
                        {edit ? (
                            <select
                                value={selectedUpazila?.id ?? ""}
                                disabled={!selectedDistrict}
                                onChange={e => {
                                    const upz = upazila.find(u => u.id === Number(e.target.value));
                                    if (upz) setSelectedUpazila({ id: upz.id, name: upz.bn_name });
                                }}
                                className="select border border-gray-300 select-sm rounded-xl py-1 px-3 
                                   focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
                            >
                                <option value="" disabled>উপজেলা নির্বাচন করুন</option>
                                {upazila
                                    .filter(u => u.district_id === selectedDistrict?.id)
                                    .map(u => <option key={u.id} value={u.id}>{u.bn_name}</option>)}
                            </select>
                        ) : (
                            <span className="ml-2">{user.address?.upazila}</span>
                        )}
                    </div>
                </div>

                <div className="flex justify-between pb-2">


                    {/* District */}
                    <div className="grid grid-cols-2 gap-3 items-center w-full">
                        <label className="text-gray-700 font-medium ml-4">জেলা *</label>
                        {edit ? (
                            <select
                                value={selectedDistrict?.id ?? ""}
                                disabled={!selectedDivision}
                                onChange={e => {
                                    const dist = district.find(d => d.id === Number(e.target.value));
                                    if (dist) {
                                        setSelectedDistrict({ id: dist.id, name: dist.bn_name });
                                        setSelectedUpazila(null);
                                    }
                                }}
                                className="select border border-gray-300 select-sm rounded-xl py-1 px-3 
                                   focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
                            >
                                <option value="" disabled>জেলা নির্বাচন করুন</option>
                                {district
                                    .filter(d => d.division_id === selectedDivision?.id)
                                    .map(d => <option key={d.id} value={d.id}>{d.bn_name}</option>)}
                            </select>
                        ) : (
                            <span className="ml-2">{user.address?.district}</span>
                        )}
                    </div>

                    {/* Division */}
                    <div className="grid grid-cols-2 gap-3 items-center  w-full">
                        <label className="text-gray-700 font-medium ml-4">বিভাগ *</label>
                        {edit ? (
                            <select
                                value={selectedDivision?.id ?? ""}
                                onChange={e => {
                                    const divi = division.find(d => d.id === Number(e.target.value));
                                    if (divi) {
                                        setSelectedDivision({ id: divi.id, name: divi.bn_name });
                                        setSelectedDistrict(null);
                                        setSelectedUpazila(null);
                                    }
                                }}
                                className="select border border-gray-300 select-sm rounded-xl py-1 px-3 
                                   focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
                            >
                                <option value="" disabled>বিভাগ নির্বাচন করুন</option>
                                {division.map(d => <option key={d.id} value={d.id}>{d.bn_name}</option>)}
                            </select>
                        ) : (
                            <span className="ml-2">{user.address?.division}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Save / Edit Button */}
            {rootEdit && <div className="flex justify-end w-full top-0 right-0 absolute">
                {edit ? (
                    <button
                        onClick={saveUpdate}
                        className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm transition-all"
                    >
                        <RefreshCcw className="h-3.5 w-3.5" />
                        <span>Update</span>
                    </button>
                ) : (
                    <button
                        onClick={() => setEdit(true)}
                        className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm transition-all"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit Address</span>
                    </button>
                )}
            </div>}
        </div>
    );
};

export default ChangeAddress;
