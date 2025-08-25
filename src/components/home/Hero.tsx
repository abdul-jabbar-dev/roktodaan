'use client'
import React from 'react'
import HeroSerch from './HeroSerch';
import HeroSerchDoner from './HeroSerchDoner';

export default function Hero() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>

            <div className="hero bg-gray-100 ">
                <div className="hero-content flex-col md:flex-row-reverse lg:gap-x-12 md:gap-x-6 px-0 py-12">

                    <div className="text-center md:text-left w-full md:w-5/12">
                        <h1 className="text-5xl font-bold"><span className='text-neutral'>রক্ত</span> খুঁজুন, জীবন বাঁচান</h1>
                        <p className="py-6 text text-xl font-light text-gray-700">
                            আপনার এলাকার রক্তদাতাদের সঙ্গে তৎক্ষণাৎ সংযোগ করুন এবং জরুরি অবস্থায় সাহায্য করুন।
                        </p>
                    </div>

                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                        <HeroSerch open={open} setOpen={setOpen} />
                    </div>
                </div>
            </div>
            <div className="collapse ">
                <input type="radio" readOnly name="my-accordion-1" className='collapse-title hidden p-0 my-0' checked={open} />

                <div style={{ padding: 0 }} className="collapse-content mx-auto ">
                    <div className=' w-full py-4 '>See All
                        <HeroSerchDoner />
                    </div>
                </div>




            </div>

        </div >
    )
}
