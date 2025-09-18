// app/profile/page.tsx
import API from "@/api";
import ChangeAddress from "@/components/profile/ChangeAddress";
import DonationExperiance from "@/components/profile/DonationExperiance";
import DonationStat from "@/components/profile/DonationStat";
import Profile from "@/components/profile/Profile";
import RelatedProfile from "@/components/profile/RelatedProfile.server";
import CDInputToText from "@/components/ui/CDInputToText";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
    const {data:user} = await API.user.getUser(params.id);
 
    if (!user) {
        return <div className="text-center py-10 text-gray-500">User data not found</div>;
    }

    return (
        <div className="container mx-auto my-5 p-5 relative">
            <div className="md:flex no-wrap md:-mx-2">

                {/* Left Sidebar */}
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-red-400">
                        <div className="image overflow-hidden relative max-h-80">
                            <img
                                src={user?.profile?.img || "https://res.cloudinary.com/dnkwv76h3/image/upload/v1757350374/roktodan/hvt5xegpafmeix4thrjp.png"}
                                alt="Profile Image"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                            {CDInputToText({
                                placeholder: 'Full Name',
                                value: user?.profile?.fullName || "Not Set",
                                edit: false,
                                name: 'fullName'
                            })}
                        </h1>

                        <h3 className="text-gray-600 font-lg text-semibold leading-6">
                            {CDInputToText({
                                placeholder: 'Occupation',
                                value: user?.profile?.occupation || "Not Set",
                                edit: false,
                                name: 'occupation'
                            })}
                        </h3>
                    </div>

                    <div className="my-4"></div>

                    <RelatedProfile />
                </div>

                {/* Right Content */}
                <div className="w-full md:w-9/12 mx-2 h-auto relative">
                    <div className="flex justify-center w-full space-x-4 mt-8">
                        <DonationStat user={user} rootEdit={false} />
                    </div>

                    <div className="my-4"></div>
                    <Profile user={user} edit={false} />

                    <div className="my-4"></div>
                    <ChangeAddress rootEdit={false} user={user} />

                    <div className="my-4"></div>
                    <DonationExperiance rootEdit={false} user={user} />
                </div>
            </div>
        </div>
    );
};

export default Page;
