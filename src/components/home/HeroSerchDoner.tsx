import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import Image from "next/image";

export default function HeroSerchDoner() {
    const doners = [
        { id: 1, name: "Abdul Jabbar", age: 21, location: "Tongi Gazipur Dhaka Bangladesh.", bloodGroup: "O+", profileImage: "https://avatar.iran.liara.run/public/boy" },
        { id: 2, name: "Hasan", age: 24, location: "Dhaka, Bangladesh.", bloodGroup: "A+", profileImage: "https://avatar.iran.liara.run/public/boy" },
        { id: 3, name: "Rahim", age: 20, location: "Gazipur, Bangladesh.", bloodGroup: "B-", profileImage: "https://avatar.iran.liara.run/public/boy" },
        { id: 4, name: "Karim", age: 29, location: "Uttara, Dhaka.", bloodGroup: "AB+", profileImage: "https://avatar.iran.liara.run/public/boy" },
        { id: 5, name: "Jabed", age: 26, location: "Mirpur, Dhaka.", bloodGroup: "O-", profileImage: "https://avatar.iran.liara.run/public/boy" },
        { id: 6, name: "Nayeem", age: 23, location: "Banani, Dhaka.", bloodGroup: "A-", profileImage: "https://avatar.iran.liara.run/public/boy" },
        { id: 7, name: "Sakib", age: 22, location: "Barishal, Bangladesh.", bloodGroup: "B+", profileImage: "https://avatar.iran.liara.run/public/boy" },
        { id: 8, name: "Fahim", age: 25, location: "Cumilla, Bangladesh.", bloodGroup: "AB-", profileImage: "https://avatar.iran.liara.run/public/boy" },
    ];

    const bloodGroups = [
        { name: "O+", img: "/svg/op.svg" },
        { name: "O-", img: "/svg/on.svg" },
        { name: "A+", img: "/svg/ap.svg" },
        { name: "A-", img: "/svg/an.svg" },
        { name: "B+", img: "/svg/bp.svg" },
        { name: "B-", img: "/svg/bn.svg" },
        { name: "AB+", img: "/svg/abp.svg" },
        { name: "AB-", img: "/svg/abn.svg" }
    ];

    return (
        <Swiper
            slidesPerView={2}
            spaceBetween={20}

            pagination={{ clickable: true }}
            breakpoints={{
                0: {
                    slidesPerView: 1,   // mobile এ ১টা card
                    spaceBetween: 5,
                    loop: false, width: 250, updateOnWindowResize: true // 👉 Mobile এ loop বন্ধ
                },
                320: {
                    slidesPerView: 1,   // mobile এ ১টা card
                    spaceBetween: 10,
                    loop: false, width: 300, updateOnWindowResize: true     // 👉 Mobile এ loop বন্ধ
                },
                640: {
                    slidesPerView: 2,   // tablet এ ২টা card
                    spaceBetween: 15,
                    loop: true, width: null
                },
                1024: {
                    slidesPerView: 3,   // laptop এ ৩টা card
                    spaceBetween: 20,
                    loop: true, width: null
                },
                1280: {
                    slidesPerView: 4,   // বড় screen এ ৪টা card
                    spaceBetween: 25,
                    loop: true, width: null
                },
            }}
            modules={[Pagination]}
            className="mySwiper container mx-auto"
        >
            {doners.map((doner) => (
                <SwiperSlide className="py-6" key={doner.id}>
                    <div className="card relative flex flex-col sm:h-56 h-96  sm:flex-row w-full card-side bg-base-100 shadow-sm">
                        <figure>
                            <Image width={100} height={160} className="sm:w-32 w-full h-72 object-cover" src={doner.profileImage} alt={doner.name} />
                        </figure>
                        <div className="card-body relative">
                            <div>
                                <h2 className="card-title">{doner.name}</h2>
                                <h2>Age: {doner.age}</h2>
                            </div>
                            <p>{doner.location}</p>
                            <span className="w-11 absolute top-4 right-4">
                                <Image
                                    className="w-11"
                                    src={(bloodGroups.find((bg) => bg.name === doner.bloodGroup)?.img as string)}
                                    alt={doner.bloodGroup}
                                    height={30}
                                    width={30}
                                />
                            </span>
                            <div className="card-actions justify-end">
                                <button className="btn btn-neutral rounded-lg btn-sm">View Contact</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>


    );
}
