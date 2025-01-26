// src/store/confirmationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    isConfirm: false,
    preferences: {
        preferred: [],
        disliked: [],
    },
};

const confirmationSlice = createSlice({
    name: 'confirmation',
    initialState,
    reducers: {
        openConfirmationModal: (state, action) => {
            state.isOpen = true;
            // Optionally set preferences if provided
            if (action.payload?.preferences) {
                state.preferences = action.payload.preferences;
            }
        },
        closeConfirmationModal: (state) => {
            state.isOpen = false;
            state.isConfirm = false;
            state.preferences = { preferred: [], disliked: [] };
        },
        setIsConfirm: (state, action) => {
            state.isConfirm = action.payload;
        },
        setPreferences: (state, action) => {
            state.preferences = action.payload;
        },
    },
});

export const {
    openConfirmationModal,
    closeConfirmationModal,
    setIsConfirm,
    setPreferences,
} = confirmationSlice.actions;

export default confirmationSlice.reducer;
