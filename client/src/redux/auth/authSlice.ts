import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState } from "../../types";

const initialState: IAuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  name: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
  accountType: localStorage.getItem("accountType") as "user" | "company" | "admin" | null,
  loading: false,
  error: null,
};

type SignupPayload = { name: string; email: string; password: string };
type LoginPayload = { email: string; password: string };

const API_BASE = process.env.API_URL || "http://localhost:8000";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: SignupPayload, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue(json?.message || "Signup failed");
      }

      // LOGIN AUTOMATICALLY AFTER SIGNUP
      dispatch(
        login({
          token: json.token,
          name: json.user.name,
          email: json.user.email,
          accountType: "user",
        }),
      );

      return json;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Network error";
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue(json?.message || "Login failed");
      }

      dispatch(
        login({
          token: json.token,
          name: json.user.name,
          email: json.user.email,
          accountType: "user",
        }),
      );

      return json;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Network error";
      return rejectWithValue(errorMessage);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
      state.accountType = null;
      state.loading = false;
      state.error = null;
      localStorage.clear();
    },

    login: (
      state,
      action: PayloadAction<{
        token: string;
        name: string;
        email?: string;
        accountType: "company" | "admin" | "user";
      }>,
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email || null;
      state.accountType = action.payload.accountType;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("name", action.payload.name);
      if (action.payload.email) {
        localStorage.setItem("email", action.payload.email);
      }
      localStorage.setItem("accountType", action.payload.accountType);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
