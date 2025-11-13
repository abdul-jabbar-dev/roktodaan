import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerSlice";
import userReducer from "./slice/userSlice";
import { quickDonor } from "./services/homeDonor";
import { request } from "./services/request";
export const store = configureStore({
  reducer: {
    register: registerReducer,
    user: userReducer,
    [quickDonor.reducerPath]: quickDonor.reducer,
    [request.reducerPath]: request.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([quickDonor.middleware,request.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
