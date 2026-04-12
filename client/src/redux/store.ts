import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import schedulesReducer from "./schedulesSlice";
import bookingsReducer from "./bookingsSlice";
import departmentsReducer from "./departmentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedules: schedulesReducer,
    bookings: bookingsReducer,
    departments: departmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;