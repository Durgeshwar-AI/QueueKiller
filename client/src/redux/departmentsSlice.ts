import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IDepartment } from "../types";
import type { RootState } from "./store";

interface IDepartmentsState {
  departments: IDepartment[];
  loading: boolean;
  error: string | null;
}

const API_BASE = process.env.API_URL || "http://localhost:8000";

const initialState: IDepartmentsState = {
  departments: [],
  loading: false,
  error: null,
};

export const fetchDepartments = createAsyncThunk(
  "departments/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.get(`${API_BASE}/api/company/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.departments;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : "Failed to fetch departments";
      return rejectWithValue(message || "Failed to fetch departments");
    }
  }
);

export const createDepartment = createAsyncThunk(
  "departments/create",
  async (name: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const res = await axios.post(
        `${API_BASE}/api/company/departments`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.department;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : "Failed to create department";
      return rejectWithValue(message || "Failed to create department");
    }
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
      });
  },
});

export default departmentsSlice.reducer;
