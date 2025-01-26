// src/store/errorModalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    message: '',
};

const errorModalSlice = createSlice({
    name: 'errorModal',
    initialState,
    reducers: {
        openErrorModal: (state, action) => {
            state.isOpen = true;
            // Optionally set a message if passed in
            state.message = action.payload?.message ?? '';
        },
        closeErrorModal: (state) => {
            state.isOpen = false;
            state.message = '';
        },
    },
});

export const { openErrorModal, closeErrorModal } = errorModalSlice.actions;
export default errorModalSlice.reducer;
