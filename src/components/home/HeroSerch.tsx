'use client'
import { useGetDonorsQuery } from '@/redux/services/homeDonor';
import React, { useEffect, useState } from 'react'
import { QueryState } from './Hero';
import CloseIcon from '@rsuite/icons/Close';
import CDTooltip from '../ui/CDTooltip';
export default function HeroSearch({ open, setUseQuery, setOpen }: { open: boolean, setUseQuery: React.Dispatch<React.SetStateAction<QueryState>>, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [selectedDivision, setSelectedDivision] = useState<{ id: number, name: string } | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<{ id: number, name: string } | null>(null);
    const [selectedUpazila, setSelectedUpazila] = useState<{ id: number, name: string } | null>(null);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);
    const [coords, setCoords] = useState<{ latitude: number, longitude: number } | null>(null);

    const [division, setDivision] = useState<{ id: number, name: string }[]>([]);
    const [district, setDistrict] = useState<{ id: number, division_id: number, name: string }[]>([]);
    const [upazila, setUpazila] = useState<{ id: number, district_id: number, name: string }[]>([]);
 


    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        });
    }

    const getDonors = () => {
        setOpen(false)
        if (!selectedBloodGroup) return;

        if (coords?.latitude != null && coords?.longitude != null) {
            // GPS address
            setUseQuery({
                bloodGroup: selectedBloodGroup,
                address: { latitude: coords.latitude, longitude: coords.longitude },
            });
        } else if (selectedDivision?.name) {
            // Admin address, district & upazila optional
            setUseQuery({
                bloodGroup: selectedBloodGroup,
                address: {
                    division: selectedDivision.name,
                    ...(selectedDistrict?.name && { district: selectedDistrict.name }),
                    ...(selectedUpazila?.name && { upazila: selectedUpazila.name }),
                },
            });
        } else {
            console.warn("Incomplete query, nothing will be sent");
        }
    }


    useEffect(() => {
        fetch('/api/location/division.json').then(res => res.json()).then(setDivision);
        fetch('/api/location/districts.json').then(res => res.json()).then(setDistrict);
        fetch('/api/location/upazila.json').then(res => res.json()).then(setUpazila);
    }, []);


    return (
        <div className="card-body">
            <fieldset className="fieldset w-full py-3">
                {/* Blood Group */}
                <div className="flex filter overflow-hidden w-full gap-y-1">
                    <input
                        className="btn btn-sm rounded-lg filter-reset bg-neutral text-white text-xl "
                        type="radio"
                        name="bloodGroup"
                        onChange={() => setSelectedBloodGroup("none")}
                        aria-label={"none"}
                        value={"none"}
                    />
                    {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(bg => (
                        <input
                            key={bg}
                            className="btn btn-sm rounded-lg"
                            type="radio"
                            name="bloodGroup"
                            onChange={() => setSelectedBloodGroup(bg)}
                            aria-label={bg}
                            value={bg}
                        />
                    ))}
                </div>

                <div>
                    {/* Division + District */}
                    <div className="flex gap-x-2 w-full mt-3">
                        {/* Division */}
                        <div className="w-full">
                            <label className="label my-1">বিভাগ</label>
                            <select
                                value={selectedDivision?.id ?? ""}
                                className="select"
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    const divi = division.find(d => d.id === id);
                                    if (divi) {
                                        setSelectedDivision({ id: divi.id, name: divi.name });
                                        setSelectedDistrict(null);
                                        setSelectedUpazila(null);
                                    }
                                }}
                            >
                                <option value="" disabled>বিভাগ নির্বাচন করুন</option>
                                {division.map(divi => (
                                    <option key={divi.id} value={divi.id}>{divi.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* District */}
                        <div className="w-full">
                            <label className="label my-1">District</label>
                            <select
                                value={selectedDistrict?.id ?? ""}
                                className="select"
                                disabled={!selectedDivision}
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    const dist = district.find(d => d.id === id);
                                    if (dist) {
                                        setSelectedDistrict({ id: dist.id, name: dist.name });
                                        setSelectedUpazila(null);
                                    }
                                }}
                            >
                                <option value="" disabled>Select District</option>
                                {district
                                    .filter(d => d.division_id === selectedDivision?.id)
                                    .map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    {/* Upazila */}
                    <div className="flex w-full mt-3">
                        <span className="w-full flex flex-col ">
                            <label className="label my-1">Upazila</label>
                            <select
                                value={selectedUpazila?.id ?? ""}
                                className="select w-full"
                                disabled={!selectedDistrict}
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    const upz = upazila.find(u => u.id === id);
                                    if (upz) {
                                        setSelectedUpazila({ id: upz.id, name: upz.name });
                                    }
                                }}
                            >
                                <option value="" disabled>Select Upazila</option>
                                {upazila
                                    .filter(u => u.district_id === selectedDistrict?.id)
                                    .map(u => (
                                        <option key={u.id} value={u.id}>{u.name}</option>
                                    ))}
                            </select>
                        </span>
                    </div>
                </div>
                <div className="divider">OR</div>
                <div className="flex gap-x-2">
                    <CDTooltip placement='top' tooltipText='Under Construction'>
                        <button
                        className={`${coords?.latitude != null && coords?.longitude != null
                            ? "bg-gray-100 cursor-not-allowed" // অবস্থান থাকলে hover/active blocked
                            : "bg-red-100 hover:bg-gray-200 transition"
                            } text-gray-700 font-semibold py-2 px-4 rounded-lg disabled:opacity-50 w-full`}
                        onClick={getLocation}
                        disabled={coords?.latitude != null && coords?.longitude != null} // prevent click
                    >
                        {coords?.latitude != null && coords?.longitude != null
                            ? "অবস্থান পেয়েছি"
                            : "আমার অবস্থান"}
                    </button>
                    </CDTooltip>
                    {coords?.latitude && coords?.longitude && <button
                        className={`text-gray-700 font-semibold py-2 px-4 rounded-lg disabled:opacity-50 w-12 bg-red-100 hover:bg-gray-200 transition`}
                        onClick={() => setCoords(null)}  >
                        <CloseIcon className={`text-gray-700 font-bold  `} />
                    </button>}
                </div>

                <button className="btn btn-neutral text-white mt-4 rounded-xl"
                    onClick={() => {
                        getDonors()

                    }}
                >
                    Search
                </button>
            </fieldset>
        </div>
    )
}
