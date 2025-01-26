// src/store/modalTriggerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const modalTriggerSlice = createSlice({
    name: 'modalTrigger',
    initialState,
    reducers: {
        openModalTrigger: (state) => {
            state.isOpen = true;
        },
        closeModalTrigger: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openModalTrigger, closeModalTrigger } = modalTriggerSlice.actions;

export default modalTriggerSlice.reducer;
