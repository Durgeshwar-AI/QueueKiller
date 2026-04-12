import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IBooking, IPaymentData } from "../types";
import type { RootState } from "./store";

const API_BASE = process.env.API_URL || "http://localhost:8000";

interface IBookingsState {
  bookings: IBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: IBookingsState = {
  bookings: [],
  loading: false,
  error: null,
};
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.get(`${API_BASE}/api/user/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.bookings;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : "Failed to fetch bookings";
      return rejectWithValue(message || "Failed to fetch bookings");
    }
  }
);

export const bookSchedule = createAsyncThunk(
  "bookings/create",
  async (scheduleId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      // Step 1: Lock the slot and get order details
      const res = await axios.post(
        `${API_BASE}/api/user/bookings/book`,
        { id: scheduleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Step 2: Create Razorpay order
      const orderRes = await axios.post(
          `${API_BASE}/api/user/payment/create-order`,
          { scheduleId },
          { headers: { Authorization: `Bearer ${token}` } }
      );

      return { ...res.data, ...orderRes.data, scheduleId }; // Contains orderId, amount, etc.
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : "Failed to book schedule";
      return rejectWithValue(message || "Failed to book schedule");
    }
  }
);

export const verifyPayment = createAsyncThunk(
    "bookings/verifyPayment",
    async (paymentData: IPaymentData, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.token;
            const res = await axios.post(
                `${API_BASE?.replace(/\/$/, "")}/api/user/payment/verify-payment`,
                paymentData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return res.data.booking;
        } catch (err: unknown) {
            const message = axios.isAxiosError(err) ? err.response?.data?.message : "Payment verification failed";
            return rejectWithValue(message || "Payment verification failed");
        }
    }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingsSlice.reducer;
