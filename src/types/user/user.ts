import BloodGroup from "../blood/group";

export type Address = {
  area?: string;
  division?: string;
  district?: string;
  upazila?: string;
  coords?:
    | { latitude: number; longitude: number }
    | [number, number][]; // polygon
};

type Profile = {
  fullName?: string;
  age?: number;
  gender?: "Male" | "Female" | string;
  email?: string;
  bod?: string;
  img?: string;
  occupation?: string;
  phoneNumber?: string;
  weight?: number;
  bloodGroup?: BloodGroup;
  activeDoner?: boolean;
};

export type DonorInfo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
  address: Address;
  donationExperience: [];
};

type UserUpdateInput = {
  id?: number | string;
  userId?: number;
  profile: Profile;
};

export default UserUpdateInput;
