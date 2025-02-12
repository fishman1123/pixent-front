import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  nickname: null,
  viewChance: null,
  viewAttempts: null,
  userEmail: null,
  userProvider: null,
};

// Map the payload keys to the auth slice keys
const fieldMapping = {
  isAuthenticated: "isAuthenticated",
  nickname: "nickname",
  email: "userEmail",
  provider: "userProvider",
  usageLimit: "viewChance",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      const payload = action.payload || {};

      // Loop over the fieldMapping to do partial updates
      Object.entries(fieldMapping).forEach(([payloadKey, sliceKey]) => {
        if (typeof payload[payloadKey] !== "undefined") {
          state[sliceKey] = payload[payloadKey];
        }
      });

      // state.viewChance = 3;
      state.viewAttempts = 10;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.nickname = null;
      state.viewChance = null;
      state.viewAttempts = null;
      state.userEmail = null;
      state.userProvider = null;
    },
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
