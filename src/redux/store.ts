import { configureStore } from "@reduxjs/toolkit"; 
import registerReducer from "./slice/registerSlice";
export const store = configureStore({
  reducer: {
    register: registerReducer
  },
});
