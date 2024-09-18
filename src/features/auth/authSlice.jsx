import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: "guess",
    isLoggedIn: false,
    user: null,
    access_token: null,
    refresh_token: null,
    groups: [], // Thêm trường groups để chứa thông tin các group của user
  },

  reducers: {
    login: (state, action) => {
      state.role = action.payload.role_name;
      state.isLoggedIn = true;
      state.user = {
        user_id: action.payload.user_id,
        username: action.payload.username,
        phone: action.payload.phone,
        email: action.payload.email,
        role_id: action.payload.role_id,
      };
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.groups = action.payload.groups || []; // Cập nhật thông tin groups từ payload
    },
    logout: (state) => {
      state.role = "guess";
      state.isLoggedIn = false;
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.groups = []; // Xóa thông tin groups khi đăng xuất
    },
    update: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload.user,
      };
      if (action.payload.groups) {
        state.groups = action.payload.groups; // Cập nhật groups nếu có trong payload
      }
    },
  },
});

export const { login, logout, update } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
