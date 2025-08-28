'use client';
import { Check, X } from 'lucide-react';
import React from 'react';

const groups = ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'];

// canGive[donor][recipient] → boolean
const canGive: Record<string, Record<string, boolean>> = {
    'O−': { 'O−': true, 'O+': true, 'A−': true, 'A+': true, 'B−': true, 'B+': true, 'AB−': true, 'AB+': true },
    'O+': { 'O−': false, 'O+': true, 'A−': false, 'A+': true, 'B−': false, 'B+': true, 'AB−': false, 'AB+': true },
    'A−': { 'O−': false, 'O+': false, 'A−': true, 'A+': true, 'B−': false, 'B+': false, 'AB−': true, 'AB+': true },
    'A+': { 'O−': false, 'O+': false, 'A−': false, 'A+': true, 'B−': false, 'B+': false, 'AB−': false, 'AB+': true },
    'B−': { 'O−': false, 'O+': false, 'A−': false, 'A+': false, 'B−': true, 'B+': true, 'AB−': true, 'AB+': true },
    'B+': { 'O−': false, 'O+': false, 'A−': false, 'A+': false, 'B−': false, 'B+': true, 'AB−': false, 'AB+': true },
    'AB−': { 'O−': false, 'O+': false, 'A−': false, 'A+': false, 'B−': false, 'B+': false, 'AB−': true, 'AB+': true },
    'AB+': { 'O−': false, 'O+': false, 'A−': false, 'A+': false, 'B−': false, 'B+': false, 'AB−': false, 'AB+': true },
};

export default function CompatibilitySection() {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-20">
                    রক্তের গ্রুপ সামঞ্জস্য চার্ট
                </h2>

                <div className="overflow-x-auto rounded-2xl shadow-sm border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="p-3 text-left font-semibold text-gray-600">Donor ↓ / Recipient →</th>
                                {groups.map(g => (
                                    <th key={g} className="p-3 text-gray-600 text-center font-semibold">{g}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(donor => (
                                <tr key={donor} className="even:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-600">{donor}</td>
                                    {groups.map(recipient => {
                                        const ok = canGive[donor][recipient];
                                        return (
                                            <td key={recipient} className="p-3 text-center">
                                                <span className={`inline-flex items-center justify-center w-6 h-6 p-1 rounded-full 
                          ${ok ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {ok ? <Check /> : <X />}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-gray-600 text-sm mt-4">
                    নোট: Rh factor (পজিটিভ/নেগেটিভ) অনুযায়ী সামঞ্জস্য পরিবর্তিত হয়। AB+ সাধারণত universal recipient এবং O− universal donor হিসেবে ধরা হয়।
                </p>
            </div>
        </section>
    );
}
