import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ISchedule } from "../types";
import type { RootState } from "./store";

interface ISchedulesState {
  schedules: ISchedule[];
  loading: boolean;
  error: string | null;
}

const API_BASE = process.env.API_URL || "http://localhost:8000";

const initialState: ISchedulesState = {
  schedules: [],
  loading: false,
  error: null,
};

export const fetchSchedulesByDept = createAsyncThunk(
  "schedules/fetchByDept",
  async (departmentID: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.get(`${API_BASE}/api/company/schedules/${departmentID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.schedules;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : "Failed to fetch schedules";
      return rejectWithValue(message || "Failed to fetch schedules");
    }
  }
);

export const createSchedule = createAsyncThunk(
  "schedules/create",
  async (data: { departmentId: number; date: string; startTime: string; endTime: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.post(
        `${API_BASE}/api/company/schedules`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.schedule;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : "Failed to create schedule";
      return rejectWithValue(message || "Failed to create schedule");
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  "schedules/delete",
  async (schedulesID: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      await axios.delete(`${API_BASE}/api/company/schedules/${schedulesID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return schedulesID;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : "Failed to delete schedule";
      return rejectWithValue(message || "Failed to delete schedule");
    }
  }
);

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedulesByDept.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedulesByDept.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedulesByDept.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload);
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter((s) => s.id !== action.payload);
      });
  },
});

export default schedulesSlice.reducer;
