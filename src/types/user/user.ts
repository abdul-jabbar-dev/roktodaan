import BloodGroup from "../blood/group";

export type Address = {
  area?: string;
  division?: string;
  district?: string;
  upazila?: string;
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

type UserUpdateInput = {
  id?: number;
  userId?: number;
  profile: Profile;
};

export default UserUpdateInput;
