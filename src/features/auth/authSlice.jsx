import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    access_token: null,
    refresh_token: null,
  },

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    update: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, update } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
