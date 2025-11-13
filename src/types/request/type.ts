import BloodGroup from "../blood/group";
import { Location } from "../location/destination";

export enum RequestStatus {
  VeryUrgent = "VeryUrgent",
  Urgent = "Urgent",
  Needed = "Needed",
}
export enum DonationStatus {
  Done = "Done",
  NoNeed = "NoNeed",
  Reserved = "Reserved",
  Upcomming = "Upcomming",
}
export enum DonationType {
  WholeBlood = "WholeBlood",
  Plasma = "Plasma",
  Platelets = "Platelets",
  RedBloodCells = "RedBloodCells",
}
export enum RequestStatusBl {
  VeryUrgent = "খুব প্রয়োজন",
  Urgent = "প্রয়োজন",
  Needed = "লাগবে",
}
export enum DonationStatusBl {
  Done = "সম্পন্ন",
  NoNeed = "প্রয়োজন নেই",
  Reserved = "সংরক্ষিত",
  Upcomming = "আসন্ন",
}

export interface Donation {
  id: string;
  date: Date;
  place: string;
  status: DonationStatus;
  bloodType: DonationType;
    reserved?: {
    id: string;
    donationId: string;
    donorId?: string;
    donor?: Donor;
    otherName?: string | null;
    otherPhoneNumber?: string | null;
    otherAddress?: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
export interface BloodRequest {
  id?: string;
  patientName: string;
  bloodGroup: BloodGroup;
  hospital?: string;
  urgency: RequestStatus;
  postedAt: string;
  contact: string;
  reason: string;
  attendantName: string;
  donations: Donation[];
  donorMessage: string;
  address: Location;
}



export interface Donor {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  age: number;
  bloodGroup: string;
  img: string;
  activeDoner: boolean;
  weight?: number | null;
  occupation?: string | null;
  bod?: string | null;
  createdAt: string;
  updatedAt: string;
}