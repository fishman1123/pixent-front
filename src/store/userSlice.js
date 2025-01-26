// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false, // If you still want it here, though typically we rely on authSlice
    userName: null,
    userGender: null,
    keyword: null,
    securityNumber: null,
    userLanguage: 'ko', // default to 'ko'
    userImageName: null,
    userImage: null,
    currentPage: '/intro',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state, action) => {
            // Merge new fields into the existing state
            const newValues = action.payload;
            Object.assign(state, newValues);
        },
        setUserLanguage: (state, action) => {
            // Specifically update the userLanguage property
            state.userLanguage = action.payload;
        },
        setCurrentPage: (state, action) => {
            //set current page by it
            state.currentPage = action.payload;
        }
    },
});

export const { setUserState, setUserLanguage, setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
