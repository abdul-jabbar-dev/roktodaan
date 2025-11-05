import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import Image from "next/image";
import { QueryState } from "./Hero";
import { useGetDonorsQuery } from "@/redux/services/homeDonor";
import { DonorInfo } from "@/types/user/user";
import getDefaultImg from "@/utils/DefaultImg";
import { mapBloodGroupEnumToLabel } from "@/utils/BloodGroupFormet";

export default function HeroSerchDoner({ useQuery }: { useQuery: QueryState }) {


    const { data, isLoading, refetch, isSuccess } = useGetDonorsQuery(useQuery, { skip: !useQuery.bloodGroup });



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
    if (isSuccess && data?.data?.length === 0) return (
        <p className="text-center py-4">No donors found for this blood group.</p>
    )

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
            {isSuccess && data?.data?.map((donor: DonorInfo) => (
                <SwiperSlide className="py-6 min-w-92" key={donor.id}>
                    <div className="card relative flex flex-col sm:h-56 h-96  sm:flex-row w-full card-side bg-base-100 shadow-sm">
                        <figure>
                            <Image width={130} height={180} className="sm:w-32 w-full h-72 object-cover" src={donor.profile.img || getDefaultImg(donor.profile.gender as "male" | "female")} alt={donor.profile.fullName || "Donor Name"} />
                        </figure>
                        <div className="card-body relative">
                            <div>
                                <h2 className="card-title">{donor.profile.fullName}</h2>
                                <h2>Age: {donor.profile.age}</h2>
                            </div>
                            <p>
                                {[donor?.address?.upazila, donor?.address?.district, donor?.address?.division]
                                    .filter(Boolean)
                                    .join(', ')}
                            </p>
                            <span className="w-11 absolute top-4 right-4">

                                <Image
                                    className="w-11"
                                    src={(bloodGroups.find((bg) => bg.name === mapBloodGroupEnumToLabel(donor.profile.bloodGroup))?.img as string)}
                                    alt={donor.profile.bloodGroup || " "}
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
