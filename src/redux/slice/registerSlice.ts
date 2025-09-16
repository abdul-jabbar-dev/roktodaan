import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Address = {
  division: string;
  district: string;
  upazila: string;
};

type Step1 = { motivation: boolean };
type Step2 = { experience: boolean };
type Step3 = {
  lastDonationDate: string;
  lastDonationLocation: string;
  experience: boolean;
};
type Step4 = { bloodGroup: string; weight: number; age: number };
type Step5 = {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: Address;
  credential: { password: string };
};

type RegisterState = {
  step: number;
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step4: Step4;
  step5: Step5;
  userData: unknown;
};
const initialState: RegisterState = {
  step: 1,
  step1: { motivation: false },
  step2: { experience: false },
  step3: { lastDonationDate: "", lastDonationLocation: "", experience: true },
  step4: {
    bloodGroup: "",
    weight: 0,
    age: 0,
  },
  step5: {
    credential: { password: "" },
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: { division: "", district: "", upazila: "" },
  },
  userData: {},
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1; // negative হওয়া ঠেকানোর জন্য
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.step5.email = action.payload;
    },

    setStepData: (
      state,
      action: PayloadAction<{ step: number; data: unknown }>
    ) => {
      const { step, data } = action.payload;
      const stepKey = `step${step}` as keyof RegisterState;

      if (state[stepKey] && typeof state[stepKey] === "object") {
        (state as Record<typeof stepKey, unknown>)[stepKey] = {
          ...(state[stepKey] as object),
          ...(data as object),
        } as unknown;
      }

      state.step += 1;
    },

    setUserData: (state) => {
      const userData = {
        credential: { password: state.step5.credential.password },
        profile: {
          fullName: state.step5.fullName,
          age: state.step4.age,
          phoneNumber: state.step5.phoneNumber,
          gender: state.step5.gender,
          email: state.step5.email,
          weight: state.step4.weight,
          bloodGroup: state.step4.bloodGroup,
        },
        experience: state.step3.experience
          ? [
              {
                lastDonationDate: state.step3.lastDonationDate,
                lastDonationLocation: state.step3.lastDonationLocation,
              },
            ]
          : [],
        address: {
          division: state.step5.address.division,
          district: state.step5.address.district,
          upazila: state.step5.address.upazila,
        },
      };

      // Object.assign(state, initialState);

      // userData আলাদা করে বসাও
      state.userData = userData;
    },

    resetRegister: () => initialState,
  },
});

export const {
  nextStep,
  prevStep,
  setStepData,
  resetRegister,
  updateEmail,
  setUserData,
} = registerSlice.actions;
export type { RegisterState };
export default registerSlice.reducer;
