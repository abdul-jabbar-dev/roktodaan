'use client'
import React, { useEffect, useState } from 'react'

export default function HeroSearch({ setOpen, open }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {
    const [selectedBloodGroup, setSelectedBloodGroup] = useState("none");

    const [selectedDivision, setSelectedDivision] = useState<{ id: number, name: string } | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<{ id: number, name: string } | null>(null);
    const [selectedUpazila, setSelectedUpazila] = useState<{ id: number, name: string } | null>(null);

    const [division, setDivision] = useState<{ id: number, name: string, bn_name: string }[]>([]);
    const [district, setDistrict] = useState<{ id: number, division_id: number, name: string, bn_name: string }[]>([]);
    const [upazila, setUpazila] = useState<{ id: number, district_id: number, name: string, bn_name: string }[]>([]);

    useEffect(() => {
        fetch('/api/location/division.json')
            .then(res => res.json())
            .then(data => setDivision(data));

        fetch('/api/location/districts.json')
            .then(res => res.json())
            .then(data => setDistrict(data));

        fetch('/api/location/upazila.json')
            .then(res => res.json())
            .then(data => setUpazila(data));


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
                                    setSelectedDivision({ id: divi.id, name: divi.bn_name });
                                    setSelectedDistrict(null);
                                    setSelectedUpazila(null);
                                }
                            }}
                        >
                            <option value="" disabled>বিভাগ নির্বাচন করুন</option>
                            {division.map(divi => (
                                <option key={divi.id} value={divi.id}>{divi.bn_name}</option>
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
                                    setSelectedDistrict({ id: dist.id, name: dist.bn_name });
                                    setSelectedUpazila(null);
                                }
                            }}
                        >
                            <option value="" disabled>Select District</option>
                            {district
                                .filter(d => d.division_id === selectedDivision?.id)
                                .map(d => (
                                    <option key={d.id} value={d.id}>{d.bn_name}</option>
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
                                    setSelectedUpazila({ id: upz.id, name: upz.bn_name });
                                }
                            }}
                        >
                            <option value="" disabled>Select Upazila</option>
                            {upazila
                                .filter(u => u.district_id === selectedDistrict?.id)
                                .map(u => (
                                    <option key={u.id} value={u.id}>{u.bn_name}</option>
                                ))}
                        </select>
                    </span>
                </div>

                <button className="btn btn-neutral text-white mt-4 rounded-xl"
                    onClick={() => {
                        setOpen(!open);
                        console.log("Selected BloodGroup:", selectedBloodGroup);
                        console.log("Selected Division:", selectedDivision);
                        console.log("Selected District:", selectedDistrict);
                        console.log("Selected Upazila:", selectedUpazila);
                    }}
                >
                    Search
                </button>
            </fieldset>
        </div>
    )
}
