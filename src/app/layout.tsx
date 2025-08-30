import type { Metadata } from "next";
import "./globals.css";
import CustomRootLayout from "@/components/layout/CustomRootLayout";
import TopNotify from "@/components/home/TopNotify";
import RootHook from "@/hooks/RootHook";
// import 'rsuite/dist/rsuite-no-reset.min.css';
export const metadata: Metadata = {
  title: "RoktoDan - রক্ত দান করে জীবন বাঁচান",
  description:
    "RoktoDan হলো একটি অনলাইন প্ল্যাটফর্ম যেখানে রক্তদাতা এবং রক্তগ্রহীতাদের সংযোগ ঘটানো হয়। এখনই নিবন্ধন করুন এবং জীবন বাঁচাতে এগিয়ে আসুন।",
  keywords: [
    "RoktoDan",
    "রক্তদান",
    "blood donation",
    "donor register",
    "blood bank",
    "বাংলাদেশ রক্তদান",
    "life saving",
  ],
  authors: [{ name: "RoktoDan Team" }],
  openGraph: {
    title: "RoktoDan - রক্ত দান করে জীবন বাঁচান",
    description:
      "এক ফোঁটা রক্ত, এক টুকরো হাসি। এখনই RoktoDan প্ল্যাটফর্মে নিবন্ধন করুন এবং জীবন বাঁচাতে স্বেচ্ছাসেবক হোন।",
    url: "https://yourdomain.com", // তোমার লাইভ ডোমেইন দিলে ভালো হবে
    siteName: "RoktoDan",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // social share এর জন্য একটা image ব্যবহার করো
        width: 1200,
        height: 630,
        alt: "RoktoDan - Blood Donation Platform",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="cmyk">
      <body className="">
        <RootHook>
          <>
            <TopNotify />
            <CustomRootLayout />
            {children}</>
        </RootHook>
      </body>
    </html>
  );
}
