import React from 'react'
import Nibondhon from '../client/NibondhonButton'
export default function PreviousExperience_Se() {
    return (
        <section className="max-w-6xl mx-auto  px-12 xl:px-0">
            <div className="lg:w-4/5 w-full">

                {/* Title */}

                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                    আপনি কি এর আগে কখনও রক্তদান করেছেন?
                </h1>

                {/* Context */}
                <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                    আপনার পূর্ববর্তী রক্তদানের অভিজ্ঞতা আমাদের জন্য অত্যন্ত গুরুত্বপূর্ণ।
                    কারণ এর মাধ্যমে আমরা আপনার স্বাস্থ্য প্রোফাইল এবং রক্তদানের
                    উপযোগিতা আরও ভালোভাবে বুঝতে পারব।
                </p>
                <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                    সঠিক তথ্য আমাদেরকে আপনার জন্য নিরাপদ এবং সঠিক অভিজ্ঞতা নিশ্চিত করতে সহায়তা করবে।
                </p>
            </div>

            {/* Buttons */}
            <div className="font-bold lg:text-end text-center mt-8 space-x-4">
                <Nibondhon step={2} state={{ experience: true }} />

            </div>

        </section>
    )
}
