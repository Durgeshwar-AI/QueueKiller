import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IauthState {
  name: string;
  token: string;
  isLoggedIn: boolean;
  accountType: "company" | "admin" | "user" | null;
  loading?: boolean;
  error?: string | null;
}

const initialState: IauthState = {
  name: "",
  token: "",
  isLoggedIn: false,
  accountType: null,
  loading: false,
  error: null,
};

type SignupPayload = { name: string; email: string; password: string };
type LoginPayload = { email: string; password: string };

const API_BASE = process.env.API_URL || "http://localhost:8000";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: SignupPayload, { dispatch, rejectWithValue }) => {
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
        accountType: "user",
      }),
    );

    return json;
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { dispatch, rejectWithValue }) => {
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
        accountType: "user"
      }),
    );

    return json;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.name = "";
      state.token = "";
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
        accountType: "company" | "admin" | "user";
      }>,
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.accountType = action.payload.accountType;

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("name", action.payload.name);
        localStorage.setItem("accountType", action.payload.accountType);
      }
    },
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
