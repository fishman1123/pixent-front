import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import errorModalReducer from './errorModalSlice';
import confirmationReducer from './confirmationSlice';
import modalTriggerReducer from './modalTriggerSlice';
import responseDataReducer from './responseDataSlice';
import checkboxSelectionsReducer from './checkboxSelectionSlice';
import checkboxDataReducer from './checkboxDataSlice';



export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        errorModal: errorModalReducer,
        confirmation: confirmationReducer,
        modalTrigger: modalTriggerReducer,
        responseData: responseDataReducer,
        checkboxData: checkboxDataReducer,
        checkboxSelection: checkboxSelectionsReducer,
    },
});

// You can export types if you're using TypeScript, or just export store
export default store;
