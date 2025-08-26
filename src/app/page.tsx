import AboutBlood from "@/components/home/AboutBlood";
import CompatibilitySection from "@/components/home/CompatibilitySection";
import DonationProcessSection from "@/components/home/DonationProcessSection";
import DonerToReciver from "@/components/home/DonerToReciver";
import Hero from "@/components/home/Hero";
import TopNotify from "@/components/home/TopNotify";
import WhyDonateBlood from "@/components/home/WhyDonateBlood";
import RootFooter from "@/components/layout/RootFooter";

export default function Home() {
  return (
    <main>
  
      <Hero />
      <WhyDonateBlood />
      <AboutBlood />
      <CompatibilitySection/>
      <DonerToReciver/>
      <DonationProcessSection/>
      <RootFooter />
    </main>
  );
}
