import BloodGroup from "@/types/blood/group";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type DonationExperience = {
  id?: number;
  lastDonationDate: string; // ISO Date string
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
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  profile: Profile;
  address: Address;
  donationExperience?: DonationExperience[];
  credential: Credential;
};

const initialState: UserState = {
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
    bloodGroup: "A_POS" as BloodGroup, // ✅ default safe value
    activeDoner: false,
  },
  address: {
    id: undefined,
    userId: undefined,
    area: null, // ✅ null default better than ""
    division: "",
    district: "",
    upazila: "",
  },
  donationExperience: [],
  credential: {
    randomPasswod: false,
    isVerify: false,
  },
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get("/api/me");
  return res.data;
});

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDataFetch: (_state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUserData: () => initialState,
    updateAddress: (state, action: PayloadAction<Address>) => {
      if (state.address) {
        state.address = { ...state.address, ...action.payload };
      } else {
        state.address = action.payload;
      }
    },
 updateExperiance: (state, action: PayloadAction<DonationExperience | DonationExperience[]>) => {
  if (Array.isArray(action.payload)) {
    // ✅ Type assertion: payload is DonationExperience[]
    state.donationExperience = action.payload as DonationExperience[];
  } else {
    // Single object: update or add
    if (state.donationExperience) {
      const exists = state.donationExperience.find(e => e.id === action.payload.id);
      if (exists) { 
        state.donationExperience = state.donationExperience.map(e =>
          e.id === action.payload.id ? action.payload : e
        );
      } else {
        state.donationExperience = [...state.donationExperience, action.payload];
      }
    } else {
      state.donationExperience = [action.payload];
    }
  }
}



  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (_, action) => action.payload);
  },
});

export const { setUserDataFetch, clearUserData, updateAddress,updateExperiance } = user.actions;
export default user.reducer;
