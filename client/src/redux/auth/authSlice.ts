import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IauthState {
  role: string;
  name: string;
  isLoggedIn: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialState: IauthState = {
  role: "",
  name: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

type SignupPayload = { name: string; email: string; password: string };
type LoginPayload = { email: string; password: string };

const API_BASE = process.env.API_URL || "http://localhost:8000/api";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: SignupPayload, { dispatch, rejectWithValue }) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
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
        role: json.user.role,
      })
    );

    return json;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { dispatch, rejectWithValue }) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
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
        role: json.user.role,
      })
    );

    return json;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.role = "";
      state.name = "";
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      localStorage.clear();
    },

    login: (
      state,
      action: PayloadAction<{ token?: string; name: string; role: string }>
    ) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.name = action.payload.name;

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("name", action.payload.name);
        localStorage.setItem("role", action.payload.role);
      }
    },
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
