// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../api/axiosInstance";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("gToken");
    console.log(token);
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await AxiosInstance.get("/api/user/info");
      return response.data; // { username, email, provider, usageLimit, etc. }
    } catch (error) {
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
    setAuthState: (state, action) => {
      const payload = action.payload || {};

      // Update only if present in payload
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

      if (typeof payload.viewAttempts !== "undefined") {
        state.viewAttempts = payload.viewAttempts;
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.nickname = null;
      state.viewChance = null;
      state.viewAttempts = null;
      state.userEmail = null;
      state.userProvider = null;
      localStorage.removeItem("gToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        const { username, email, provider, usageLimit, viewAttempts } =
          action.payload;
        state.nickname = username;
        state.userEmail = email;
        state.userProvider = provider;
        state.viewChance = usageLimit;

        state.viewAttempts =
          typeof viewAttempts !== "undefined" ? viewAttempts : 10;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.nickname = null;
        state.viewChance = null;
        state.viewAttempts = null;
        state.userEmail = null;
        state.userProvider = null;
        localStorage.removeItem("gToken");
      });
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
