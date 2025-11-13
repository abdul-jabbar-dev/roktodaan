
import BloodRequests from "@/components/request/BloodRequests";
import URLS from "@/config";
import Link from "next/link";

const Page = async () => {
    try {
        const res = await fetch(URLS.REQUEST.ALL_REQUESTS, { cache: "no-cache" });

        if (!res.ok) {
            throw new Error(`Failed to fetch requests: ${res.statusText}`);
        }
        const data = await res?.json()
        return (
            <div className="container mx-auto px-4 py-8 md:py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        জরুরী রক্তের আবেদন
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
                        এখানে সারা দেশ থেকে আসা রক্তের আবেদনগুলো দেখানো হলো। আপনার এক ব্যাগ রক্ত
                        পারে জীবন বাঁচাতে। আপনার প্রয়োজনে নতুন আবেদন করুন।
                    </p>
                </div>

                {/* Publish Button */}
                <div className="text-center mb-8">
                    <Link href="/request/publish">
                        <button className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform duration-300 transform hover:scale-105">
                            নতুন আবেদন করুন
                        </button>
                    </Link>
                </div>

                {/* Requests List */}
                <BloodRequests requests={data?.data || []} />
            </div>
        );
    } catch (error) {
        console.error("Error loading requests:", error);

        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    জরুরী রক্তের আবেদন
                </h1>
                <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
                    এখানে সারা দেশ থেকে আসা রক্তের আবেদনগুলো দেখানো হলো। বর্তমানে ডেটা লোড করতে সমস্যা হচ্ছে।
                </p>
            </div>
        );
    }
};

export default Page;
