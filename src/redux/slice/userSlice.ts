import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "@/lib/axios";
import BloodGroup from "@/types/blood/group";
import URLS from "@/config";
import { getItemFromStore, removeItemFromStore } from "@/utils/store/localstore";

export type DonationExperience = {
  id?: number;
  lastDonationDate: string;
  lastDonationLocation: string;
};

type Address = {
  id?: number;
  userId?: number;
  area: string | null;
  division: string;
  district: string;
  upazila: string;
};

type Credential = {
  [x: string]: any;
  randomPasswod?: false;
  isVerify?: false;
};

type Profile = {
  id?: number;
  userId?: number;
  fullName: string;
  age: number;
  gender: "Male" | "Female" | string;
  email: string;
  bod?: string;
  img?: string;
  occupation?: string;
  phoneNumber: string;
  weight: number;
  bloodGroup: BloodGroup;
  activeDoner: boolean;
};

export type UserState = {
  id?: number;
  userId?: number;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
  address: Address;
  donationExperience?: DonationExperience[];
  credential: Credential;
  loading: boolean;
  error?: string;
};

const initialState: UserState & {
  loading: boolean;
  error?: string;
  success: boolean;
} = {
  id: undefined,
  userId: undefined,
  createdAt: "",
  updatedAt: "",
  profile: {
    id: undefined,
    userId: undefined,
    fullName: "",
    age: 0,
    gender: "",
    email: "",
    phoneNumber: "",
    weight: 0,
    bloodGroup: "A+",
    activeDoner: false,
  },
  address: {
    id: undefined,
    userId: undefined,
    area: null,
    division: "",
    district: "",
    upazila: "",
  },
  donationExperience: [],
  credential: { randomPasswod: false, isVerify: false },
  loading: false,
  error: undefined,
  success: false,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    const tokenStr = getItemFromStore()
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) return rejectWithValue("Token not found");

    try {
      const res = await AXIOS.get(URLS.USER.GET_MY_PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Unexpected error"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: () => {
      removeItemFromStore()
      return initialState;
    },
    setUserDataFetch: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
    setUserAddressDataFetch: (state, action: PayloadAction<Address>) => {
      Object.assign(state.address, action.payload);
    },
    setUserDonationExperianceDataFetch: (
      state,
      action: PayloadAction<DonationExperience[]>
    ) => {
      state.donationExperience /* array */ = action.payload /* array */;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserState|any>) => {
          if((action.payload as any).data) Object.assign(state, action.payload?.data);//note check why data 
          else Object.assign(state, action.payload); // note maybe its ok

          Object.assign(state, action.payload?.data);
          state.loading = false;
          state.success = true;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearUserData,
  setUserDataFetch,
  setUserAddressDataFetch,
  setUserDonationExperianceDataFetch,
} = userSlice.actions;
export default userSlice.reducer;
