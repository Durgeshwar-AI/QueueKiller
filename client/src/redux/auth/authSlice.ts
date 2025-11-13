import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: SignupPayload, { rejectWithValue }) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      return rejectWithValue(json?.message || json || "Signup failed");
    return json;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { rejectWithValue }) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      return rejectWithValue(json?.message || json || "Login failed");
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
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        // server may return token and user info
        const user = action.payload?.user || action.payload?.data || {};
        state.role = user.role || "";
        state.name = user.name || user.email || "";
        state.isLoggedIn = true;
        if (action.payload?.token)
          localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload?.user || action.payload?.data || {};
        state.role = user.role || "";
        state.name = user.name || user.email || "";
        state.isLoggedIn = true;
        if (action.payload?.token)
          localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
