
import React from 'react'
import Nibondhon from '../client/NibondhonButton' 
export default function RegisterFirtsStep() {
    return (
        <section className="max-w-6xl mx-auto  px-12 xl:px-0">
            <div className="lg:w-4/5 w-full">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">রক্ত দিন, জীবন বাঁচান</h1>
                <p className=" text-lg mb-6 text-gray-600 leading-relaxed">
                    প্রতিদিন অসংখ্য মানুষ দুর্ঘটনা, অপারেশন বা দীর্ঘমেয়াদী রোগে আক্রান্ত হয়ে রক্তের জন্য অপেক্ষা করে।
                    আপনার একটি সিদ্ধান্ত কারও জীবনে নতুন আশার আলো আনতে পারে।
                </p>
                <p className=" text-lg mb-6 text-gray-600 leading-relaxed">
                    মাত্র ১০ মিনিট সময় নিয়ে আপনি একজন মানুষের পুরো জীবন বাঁচাতে পারেন।
                    রক্তদান শুধু দানের কাজ নয়, এটি মানবতার সর্বোচ্চ দায়িত্ব।
                </p>
                <p className=" text-lg mb-8 text-gray-600 leading-relaxed">
                    নিয়মিত রক্তদান করলে শুধু রোগীরা উপকৃত হয় না,
                    বরং আপনার শরীরও নতুন রক্তকণিকা তৈরির মাধ্যমে সুস্থ থাকে।
                </p>
            </div>
            <div className="font-bold lg:text-end text-center">
               
                <Nibondhon state={1} />
            </div>
        </section>
    )
}

