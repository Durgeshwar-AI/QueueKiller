import { createSlice } from "@reduxjs/toolkit";

export interface IauthState {
    role: string,
    name: string,
    isLoggedIn: boolean
}

const initialState: IauthState = {
  role: "",
  name: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.isLoggedIn = true
    },
    logout: (state)=>{
        state.role = "";
        state.name = "";
        state.isLoggedIn = false
    }
  },
});

export const {login ,logout} = authSlice.actions

export default authSlice.reducer
