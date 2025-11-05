import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerSlice";
import userReducer from "./slice/userSlice";
import { quickDonor } from "./services/homeDonor";
export const store = configureStore({
  reducer: {
    register: registerReducer,
    user: userReducer,
    [quickDonor.reducerPath]: quickDonor.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quickDonor.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
