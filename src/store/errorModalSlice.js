// src/store/errorModalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    message: '',
    redirectTo: null,
};

const errorModalSlice = createSlice({
    name: 'errorModal',
    initialState,
    reducers: {
        openErrorModal: (state, action) => {
            state.isOpen = true;
            state.message = action.payload?.message ?? '';
            state.redirectTo = action.payload?.redirectTo ?? null;
        },
        closeErrorModal: (state) => {
            state.isOpen = false;
            state.message = '';
            state.redirectTo = null;
        },
    },
});

export const { openErrorModal, closeErrorModal } = errorModalSlice.actions;
export default errorModalSlice.reducer;
