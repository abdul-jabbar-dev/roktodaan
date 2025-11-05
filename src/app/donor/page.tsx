import PopularDonors from '@/components/donor/PopularDonors';
import Campaigns from '@/components/donor/Campaigns';
import BloodRequests from '@/components/donor/BloodRequests';
import API from '@/api';
import { getCoordsFromAI } from '@/lib/gimini/getLocation';
import dynamic from 'next/dynamic'; // 💡 এই ইম্পোর্টটি 'window' এরর ফিক্স করার জন্য জরুরি
import { DonorInfo } from '@/types/user/user';


const DynamicDonorViewPoint = dynamic(
    () => import('@/components/donor/DonorViewPoint'),
    {
        ssr: false, // 🛑 ম্যাপকে সার্ভারে রেন্ডার হওয়া থেকে থামাবে
        loading: () => (
            <div className="bg-white p-6 rounded-xl shadow-lg h-96 flex items-center justify-center">
                <p className="text-red-500 font-semibold animate-pulse">ম্যাপ লোড হচ্ছে...🌍</p>
            </div>
        )
    }
);



const UserLocation = dynamic(() => import('@/components/UserLocation'), {
    ssr: false,
});

const App: React.FC = async () => {

    const { data: initialUsers } = await API.user.getUsers();



    const fetchDonorLocations = async (users: DonorInfo[]): Promise<DonorInfo[]> => {
        if (!Array.isArray(users) || users.length === 0) {
            console.warn("⚠ No users found for geocoding.");
            return [];
        } else {


            const donorPromises = users?.map(async (user) => {


                if (!user.address?.upazila) {
                    console.warn(`Skipping GeoCoding for user ID ${user.id}: Address incomplete.`);
                    return user as DonorInfo;
                }

                const address = JSON.stringify({
                    roadORarea: user.address.area,
                    upazila: user.address.upazila,
                    district: user.address.district,
                    division: user.address.division
                }); try {
                    // GeoCoding API কল
                    const coords = await getCoordsFromAI({ address, id: user.id + "" });
                    // নতুন ডোনার অবজেক্ট তৈরি করা হচ্ছে (ইমিউটেবল আপডেট)
                    if (coords.area) {
                        return {
                            ...user,
                            address: {
                                ...user.address,
                                coords: coords.area
                            }
                        } as DonorInfo;
                    } else return {
                        ...user,
                        address: {
                            ...user.address,
                            coords: { latitude: coords.latitude, longitude: coords.longitude }
                        }
                    } as DonorInfo;
                } catch (error) {
                    console.error(`Failed to get coords for ${user.id}:`, error);
                    // GeoCoding ফেইল হলে পুরনো ডেটা নিয়েই কন্টিনিউ করুন
                    return user as DonorInfo;
                }
            });

            // 🛑 সব প্রমিস শেষ হওয়ার অপেক্ষা করুন এবং আপডেট হওয়া ডেটা ফেরত দিন
            return Promise.all(donorPromises);
        }
    };

    // 3. সব ডেটা GeoCode করে অপেক্ষা করা
    const donorsWithCoords = await fetchDonorLocations(initialUsers);

    // console.log("Updated Donors (with Coords):", donorsWithCoords[0].address);
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-12">
                    <section id="find-donors">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">আমাদের ডেডিকেটেড ডোনার্স তালিকা</h1>
                            <p className="text-gray-600 mt-2">জীবন বাঁচাতে প্রস্তুত হিরোদের খুঁজে নিন</p>
                        </div>
                        <DynamicDonorViewPoint allDonors={donorsWithCoords} />
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <PopularDonors />
                        </div>
                        <div className="lg:col-span-1">
                            <BloodRequests />
                        </div>
                    </div>

                    <Campaigns />

                </div>
            </main>
            <footer className="text-center py-6 mt-8 bg-white border-t">
                <p className="text-gray-500">&copy; ২০২৪ রক্তদান। সর্বস্বত্ব সংরক্ষিত।</p>
            </footer>
        </div>
    );
};

export default App;
