import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user collection data
export const fetchUserCollection = createAsyncThunk(
  "collection/fetchUserCollection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/report/collection");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user collection",
      );
    }
  },
);

// Fetch second collection data using UUIDs
export const fetchSecondCollection = createAsyncThunk(
  "collection/fetchSecondCollection",
  async (uuids, { rejectWithValue }) => {
    try {
      if (!uuids || uuids.length === 0) return [];
      const requests = uuids.map(async (uuid) => {
        const response = await axios.get(`/api/user/report/${uuid}/variation`);
        // console.log("I need to see this: ", response.data);
        return { uuid, data: response.data };
      });

      const results = await Promise.all(requests);
      return results;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch second collection",
      );
    }
  },
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    userCollection: null,
    secondCollection: null,
    uuids: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.userCollection = action.payload;
        state.uuids = action.payload.reportList.map((report) => report.uuid);
      })
      .addCase(fetchUserCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSecondCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecondCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.secondCollection = action.payload;
      })
      .addCase(fetchSecondCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default collectionSlice.reducer;
