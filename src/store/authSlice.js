import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    nickname: null,
    viewChance: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Set entire auth state or just specific fields
        setAuthState: (state, action) => {
            const { isAuthenticated, nickname } = action.payload;
            state.isAuthenticated = isAuthenticated;
            state.nickname = nickname ?? null;
            state.viewChance = 3 ?? null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.nickname = null;
            state.viewChance = null;
        },
    },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
