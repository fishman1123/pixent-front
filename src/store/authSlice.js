import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../api/axiosInstance";

// 1) Thunk: checkAuth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    // Read the token from localStorage
    const token = localStorage.getItem("gToken"); // or "accessToken"
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      // Attempt to fetch user info to validate the token
      const response = await AxiosInstance.get("/api/user/info");
      return response.data; // e.g. { username, email, provider, usageLimit, ... }
    } catch (error) {
      // If token is invalid or request fails, remove it
      localStorage.removeItem("gToken");
      return rejectWithValue("Invalid token");
    }
  },
);

const initialState = {
  isAuthenticated: false,
  nickname: null,
  viewChance: null,
  viewAttempts: null,
  userEmail: null,
  userProvider: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // If you want to set state manually
    setAuthState: (state, action) => {
      const payload = action.payload || {};
      if (typeof payload.isAuthenticated !== "undefined") {
        state.isAuthenticated = payload.isAuthenticated;
      }
      if (typeof payload.nickname !== "undefined") {
        state.nickname = payload.nickname;
      }
      if (typeof payload.usageLimit !== "undefined") {
        state.viewChance = payload.usageLimit;
      }
      if (typeof payload.email !== "undefined") {
        state.userEmail = payload.email;
      }
      if (typeof payload.provider !== "undefined") {
        state.userProvider = payload.provider;
      }

      // Example: always setting viewAttempts
      state.viewAttempts = 10;
    },

    // Logs out user & clears localStorage token
    logout: (state) => {
      state.isAuthenticated = false;
      state.nickname = null;
      state.viewChance = null;
      state.viewAttempts = null;
      state.userEmail = null;
      state.userProvider = null;
      localStorage.removeItem("gToken"); // or remove your "accessToken"
    },
  },

  // 2) Handle the checkAuth thunk in extraReducers
  extraReducers: (builder) => {
    builder
      // If checkAuth is fulfilled => set isAuthenticated = true
      // and load the user data (like nickname, usageLimit, etc.)
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;

        // For example, if your API returns { username, email, provider, usageLimit }
        const { username, email, provider, usageLimit } = action.payload;
        state.nickname = username;
        state.userEmail = email;
        state.userProvider = provider;
        state.viewChance = usageLimit;

        // You can set viewAttempts or any other fields as you wish
        state.viewAttempts = 10;
      })
      // If checkAuth is rejected => token is missing or invalid => not authenticated
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.nickname = null;
        state.viewChance = null;
        state.viewAttempts = null;
        state.userEmail = null;
        state.userProvider = null;

        // Also remove from localStorage
        localStorage.removeItem("gToken");
      });
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
