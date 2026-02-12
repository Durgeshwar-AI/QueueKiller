import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type LoginPayload = { email: string; password: string };

const API_BASE = process.env.API_URL || "http://localhost:8000";

interface AuthState {
  name: string;
  token: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  name: "",
  token: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

// ✅ Admin login thunk
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue(json?.message || "Admin login failed");
      }

      return json;
    } catch (err) {
      console.log(err);
      return rejectWithValue("Network error");
    }
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
      state.loading = false;
      state.error = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.name = action.payload.admin.name;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("name", action.payload.admin.name);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
