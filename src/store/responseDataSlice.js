// src/store/responseDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null, // Initially, there's no response data
};

const responseDataSlice = createSlice({
    name: 'responseData',
    initialState,
    reducers: {
        setResponseData: (state, action) => {
            state.data = action.payload;
        },
        clearResponseData: (state) => {
            state.data = null;
        },
    },
});

export const { setResponseData, clearResponseData } = responseDataSlice.actions;

export default responseDataSlice.reducer;
