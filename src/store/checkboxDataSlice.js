// src/store/checkboxDataSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const checkboxDataSlice = createSlice({
  name: "checkboxData",
  initialState,
  reducers: {
    setCheckboxData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCheckboxData } = checkboxDataSlice.actions;
export default checkboxDataSlice.reducer;
