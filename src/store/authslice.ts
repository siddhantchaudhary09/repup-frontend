import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: any;
  status: boolean;
  userprofile: any;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: false,
    userprofile: null,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.status = true;
      state.user;
    },

    addUserProfile: (state, action) => {
      state.userprofile = action.payload;
    },

    removeUser: (state) => {
      state.user = null;
      state.status = false;
      state.userprofile = null;
    },
  },
});

export default authSlice.reducer;

export const { addUser, addUserProfile, removeUser } = authSlice.actions;
