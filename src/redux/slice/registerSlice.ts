import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      const resetStep = state.step;
      state.step -= 1;
    },
    updatePhoneNumber: (state, action) => {
      state.step5.phoneNumber = action.payload;
    },

    setStepData: (state, action) => {
      const { step, data } = action.payload;
      state[`step${step}`] = { ...state[`step${step}`], ...data };

      state.step = state.step + 1;
    },

    resetRegister: () => initialState,
  },
});

export const {
  nextStep,
  prevStep,
  setStepData,
  resetRegister,
  updatePhoneNumber,
} = registerSlice.actions;

export default registerSlice.reducer;
export type RegisterState = typeof initialState;
