'use client'
import React, { useState } from 'react';
const LoginView: React.FC = () => {
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');

    const handleShareClick = () => {
        setShowShareOptions(prev => !prev);
        setCopySuccess(''); // Reset copy message
    };

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopySuccess('লিঙ্ক কপি হয়েছে!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('কপি করা যায়নি!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
        setShowShareOptions(false)
    };

    const shareUrl = "https://blood-donor-app.com";
    const shareText = "আমি রক্তদান করে জীবন বাঁচাতে সাহায্য করছি। আপনিও যোগ দিন! #BloodDonation #SaveLife";

    return (
        <section className="py-28 bg-red-50 overflow-x-hidden relative">
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">এই মহৎ উদ্যোগটি ছড়িয়ে দিন</h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    আপনার একটি শেয়ার জীবন রক্ষাকারী হতে পারে। এই উদ্যোগটি আপনার বন্ধুদের সাথে শেয়ার করুন এবং আরও জীবন বাঁচাতে সাহায্য করুন।
                </p>
                <div>

                    <button
                        onClick={handleShareClick}
                        className="mt-8 bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform duration-300 transform hover:scale-105">
                        শেয়ার করুন
                    </button>

                    {showShareOptions && (
                        <div className="mt-6 bg-white p-4 rounded-lg shadow-md max-w-xs mx-auto animate-fade-in-scale  ">
                            <h4 className="font-semibold text-gray-700 mb-3 text-center">সোশ্যাল মিডিয়াতে শেয়ার করুন</h4>
                            <div className="flex justify-center items-center space-x-4">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" title="Facebook" className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 text-blue-800 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.89v-2.89h2.89v-2.16c0-2.863 1.704-4.434 4.312-4.434 1.237 0 2.544.225 2.544.225v2.463h-1.26c-1.4 0-1.84.87-1.84 1.764v1.94h2.775l-.443 2.89h-2.332V21.878C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </a>
                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" title="Twitter" className="p-3 bg-gray-100 rounded-full hover:bg-sky-100 text-sky-500 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.04C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C7.65 9.09 4.07 7.13 1.67 4.14c-.42.72-.66 1.56-.66 2.47 0 1.49.76 2.8 1.91 3.56-.71-.02-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.68 14.37 20.68 8.5c0-.21 0-.43-.02-.63.84-.6 1.56-1.36 2.14-2.23z" />
                                    </svg>
                                </a>
                                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="p-3 bg-gray-100 rounded-full hover:bg-green-100 text-green-600 transition-colors">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.77 3.06 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.1c-1.56 0-3.07-.39-4.42-1.12l-.32-.19-3.28.86.88-3.2-.21-.34c-.82-1.34-1.26-2.88-1.26-4.48 0-4.52 3.67-8.19 8.19-8.19 2.22 0 4.28.87 5.79 2.38s2.38 3.57 2.38 5.79-3.67 8.19-8.19 8.19zm4.83-6.04c-.28-.14-1.65-.81-1.91-.91-.26-.1-.45-.14-.64.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5s-.64-1.53-.88-2.09c-.23-.55-.47-.48-.64-.48-.17 0-.35-.02-.53-.02s-.45.07-.68.35c-.23.28-.88.86-.88 2.1 0 1.23.91 2.42 1.03 2.6.13.19 1.77 2.7 4.29 3.78 2.52 1.08 2.52.72 2.97.68.45-.04 1.65-.68 1.88-1.33.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.53-.33z" />
                                    </svg>
                                </a>
                                <button onClick={handleCopyLink} title="Copy Link" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 transition-colors">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                </button>
                            </div>
                            {copySuccess && <p className="text-sm text-green-600 mt-3 text-center">{copySuccess}</p>}
                        </div>
                    )}

                </div>
            </div></section>
    );
};


export default LoginView