// src/store/checkboxSelectionSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    preferences: {
        preferred: [],
        disliked: [],
    },
};

const checkboxSelectionSlice = createSlice({
    name: 'checkboxSelection',
    initialState,
    reducers: {
        setCheckboxSelections: (state, action) => {
            state.preferences = action.payload.preferences;
        },
        toggleSelection: (state, action) => {
            const { category, optionId } = action.payload;
            const oppositeCategory = category === 'preferred' ? 'disliked' : 'preferred';

            if (state.preferences[category].includes(optionId)) {
                // If already selected in current category, remove it
                state.preferences[category] = state.preferences[category].filter(id => id !== optionId);
            } else {
                // Add to current category
                state.preferences[category].push(optionId);
                // Remove from opposite category to ensure mutual exclusivity
                state.preferences[oppositeCategory] = state.preferences[oppositeCategory].filter(id => id !== optionId);
            }
        },
    },
});

export const { setCheckboxSelections, toggleSelection } = checkboxSelectionSlice.actions;
export default checkboxSelectionSlice.reducer;
