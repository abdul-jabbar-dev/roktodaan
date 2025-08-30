import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  step1: { motivation: false },
  step2: { experience: true },
  step3: { lastDonationDate: "", lastDonationLocation: "", experience: true },
  step4: {
    bloodGroup: "",
    weight: 0,
    age: 0,
  },
  step5: {
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: { division: "", district: "", upazila: "" },
  },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },

    setStepData: (state, action) => {
      const { step, data } = action.payload;
      state[`step${step}`] = { ...state[`step${step}`], ...data };
    },

    resetRegister: () => initialState,
  },
});

export const { nextStep, prevStep, setStepData, resetRegister } =
  registerSlice.actions;

export default registerSlice.reducer;
export type RegisterState = typeof initialState;
