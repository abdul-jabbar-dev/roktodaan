export type Upazila = {
  id: number;
  district_id: number;
  name: string;
  bn_name: string;
};
export type District = {
  id: number;
  division_id: number;
  name: string;
  bn_name: string;
};
export type Division = { id: number; name: string; bn_name: string };
export type Location = {
  district: District;
  division: Division;
  upazila: Upazila;
};
