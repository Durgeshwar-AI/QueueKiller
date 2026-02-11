import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IauthState {
  role: string;
  name: string;
  token: string;
  isLoggedIn: boolean;
  loading?: boolean;
  error?: string | null;
  companyId?: number;
  companyName?: string;
}

const initialState: IauthState = {
  role: "",
  name: "",
  token: "",
  isLoggedIn: false,
  loading: false,
  error: null,
  companyId: undefined,
  companyName: undefined,
};

type SignupPayload = { name: string; email: string; password: string };
type LoginPayload = { email: string; password: string };
type CompanyLoginPayload = { key: string; password: string };

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
      }),
    );

    return json;
  },
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
      }),
    );

    return json;
  },
);

export const companyLogin = createAsyncThunk(
  "auth/companyLogin",
  async (data: CompanyLoginPayload, { dispatch, rejectWithValue }) => {
    const res = await fetch(`${API_BASE}/company/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      return rejectWithValue(json?.message || "Login failed");
    }

    dispatch(
      loginCompany({
        token: json.token,
        companyId: json.company.id,
        companyName: json.company.name,
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
      state.role = "";
      state.name = "";
      state.token = "";
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.companyId = undefined;
      state.companyName = undefined;
      localStorage.clear();
    },

    login: (
      state,
      action: PayloadAction<{ token: string; name: string; role: string }>,
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.companyId = undefined;
      state.companyName = undefined;

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("name", action.payload.name);
        localStorage.setItem("role", action.payload.role);
      }
    },

    loginCompany: (
      state,
      action: PayloadAction<{
        token: string;
        companyId: number;
        companyName: string;
      }>,
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.role = "company";
      state.companyId = action.payload.companyId;
      state.companyName = action.payload.companyName;

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("companyId", action.payload.companyId.toString());
        localStorage.setItem("companyName", action.payload.companyName);
        localStorage.setItem("role", "company");
      }
    },
  },
});

export const { logout, login, loginCompany } = authSlice.actions;
export default authSlice.reducer;
