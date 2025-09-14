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
  area?:string;
  district: District|string;
  division: Division|string;
  upazila: Upazila|string;
};
