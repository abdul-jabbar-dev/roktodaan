const LoadingAnimation: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <style>
                {`
                    @keyframes pulse-heart {
                        0%, 100% {
                            transform: rotate(180deg) scale(1);
                            opacity: 1;
                        }
                        50% {
                            transform: rotate(180deg) scale(1.1);
                            opacity: 0.9;
                        }
                    }
                    .animate-pulse-heart {
                        animation: pulse-heart 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    }
                `}
            </style>
            <div className="relative w-24 h-24 text-red-500 animate-pulse-heart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C7.58 2 4 5.58 4 10c0 2.43 1.09 4.62 2.81 6.13L12 22l5.19-5.87C18.91 14.62 20 12.43 20 10c0-4.42-3.58-8-8-8z" />
                </svg>
            </div>
            <p className="mt-6 text-xl font-semibold text-gray-700 tracking-wide">তথ্য লোড হচ্ছে...</p>
            <p className="text-gray-500 mt-1">জীবন বাঁচানোর প্রস্তুতি চলছে, অনুগ্রহ করে অপেক্ষা করুন।</p>
        </div>
    );
};
export default LoadingAnimation