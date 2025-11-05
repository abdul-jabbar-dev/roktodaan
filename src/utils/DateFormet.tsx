"use client";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/bn';

dayjs.extend(relativeTime);
dayjs.locale('bn');
import { DonationExperience } from '@/redux/slice/userSlice';
import { DonorInfo } from "@/types/user/user";

export default function ClientDate({ dateString }: { dateString?: string }) {
  if (!dateString) return <span>--/--/----</span>;

  const formattedDate = new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return <span>{formattedDate === "Invalid Date" ? "No Date" : formattedDate}</span>;
}
export const getLastDonationDateRelativeToday = (donor: DonorInfo): string => {
  const donations = donor.donationExperience as DonationExperience[];

  if (!donations?.length) return "অনুদান নেই";

  const latestDonation = donations
    .sort((a, b) => new Date(b.lastDonationDate).getTime() - new Date(a.lastDonationDate).getTime())[0];

  return latestDonation?.lastDonationDate
    ? dayjs(new Date(latestDonation.lastDonationDate)).fromNow()
    : "Date not available";
};
export const getLastDonationDate = (donor: DonorInfo): string | JSX.Element => {
  const donations = donor.donationExperience as DonationExperience[];

  if (!donations?.length) return "অনুদান নেই";

  const latestDonation = donations
    .sort((a, b) => new Date(b.lastDonationDate).getTime() - new Date(a.lastDonationDate).getTime())[0];

  return ClientDate({ dateString: latestDonation?.lastDonationDate }) || "Date not available";
};