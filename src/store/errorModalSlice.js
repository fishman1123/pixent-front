// src/store/errorModalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    message: '',
    redirectTo: null,
    alertMessage: '',
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
        setAlertMessage: (state, action) => {
            state.alertMessage = action.payload;
        },
        closeAlertMessage: (state) => {
            state.alertMessage = '';
        },
    },
});

export const { 
    openErrorModal, 
    closeErrorModal,
    setAlertMessage,
    closeAlertMessage
} = errorModalSlice.actions;
export default errorModalSlice.reducer;
