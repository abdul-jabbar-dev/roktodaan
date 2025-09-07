import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerSlice";
import userReducer from "./slice/userSlice";
export const store = configureStore({
  reducer: {
    register: registerReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
