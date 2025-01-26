// src/store/checkboxDataSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const checkboxDataSlice = createSlice({
    name: 'checkboxData',
    initialState,
    reducers: {
        setCheckboxData: (state, action) => {
            return action.payload;
        },
        // Optional: Add more reducers if needed (e.g., addCheckbox, removeCheckbox)
    },
});

export const { setCheckboxData } = checkboxDataSlice.actions;
export default checkboxDataSlice.reducer;
