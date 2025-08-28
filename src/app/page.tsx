import AboutBlood from "@/components/home/AboutBlood";
import CompatibilitySection from "@/components/home/CompatibilitySection";
import DonateOfferContainer from "@/components/home/DonateOfferContainer";
import DonationProcessSection from "@/components/home/DonationProcessSection";
import DonerToReciver from "@/components/home/DonerToReciver";
import Hero from "@/components/home/Hero";
import WhyDonateBlood from "@/components/home/WhyDonateBlood"; 

export default function Home() {
  return (
    <main>

      <Hero />
      <WhyDonateBlood />

      <div className='bg-gray-100 '>
        <div className=" max-w-6xl lg:w-4/6 w-11/12 container  text-center mx-auto py-12 text-gray-500 italic">
          <q className="text-xl">مَن قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِي الْأَرْضِ فَكَأَنَّمَا قَتَلَ النَّاسَ جَمِيعًا وَمَن أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا</q><br /><br />
          <q>যে ব্যক্তি কোনো প্রাণীকে হত্যা করে, সে যেন সমস্ত মানবজাতিকে হত্যা করেছে; আর যে ব্যক্তি একটি প্রাণীকে বাঁচায়, সে যেন সমস্ত মানবজাতিকে বাঁচিয়েছে।</q><span> সূরা আল-মায়িদা (৫:৩২)</span>
        </div>
      </div>
      <AboutBlood />
      <CompatibilitySection />
      <DonerToReciver />
      <DonationProcessSection />
      <DonateOfferContainer />
      {/* <RootFooter /> */}
    </main>
  );
}
