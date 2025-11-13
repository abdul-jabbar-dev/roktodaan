import Link from 'next/link';
import React from 'react';
const NoDonorsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(180 32 32)">
            <path d="M32 5.33331C20.56 5.33331 10.6667 14.2133 10.6667 26.6666C10.6667 33.1466 13.5733 38.9866 18.16 43L32 58.6666L45.84 43C50.4267 38.9866 53.3333 33.1466 53.3333 26.6666C53.3333 14.2133 43.44 5.33331 32 5.33331Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="22.2218" y1="22.2218" x2="41.7782" y2="41.7782" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="22.2218" y1="41.7782" x2="41.7782" y2="22.2218" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
    </svg>
);
const NoDonor = ({link,text}:{link?:React.ReactNode,text:string}) => {

             return (
            <div className="text-center py-16">
                <NoDonorsIcon className="w-24 h-24 mx-auto text-red-600" />
                <h3 className="mt-4 mb-3 text-xl font-semibold text-gray-700">কোনো ডোনার পাওয়া যায়নি</h3>
                <p className=" text-gray-500 inline">{text||"অনুগ্রহ করে আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।"} </p>{link}
            </div>
        );
}

export default NoDonor;
