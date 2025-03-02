import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uuidList: [],
};

const uuidSlice = createSlice({
  name: "uuid",
  initialState,
  reducers: {
    setUuidList: (state, action) => {
      state.uuidList = action.payload;
    },
  },
});

export const { setUuidList } = uuidSlice.actions;
export default uuidSlice.reducer;
