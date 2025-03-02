import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import errorModalReducer from "./errorModalSlice";
import confirmationReducer from "./confirmationSlice";
import modalTriggerReducer from "./modalTriggerSlice";
import responseDataReducer from "./responseDataSlice";
import checkboxSelectionsReducer from "./checkboxSelectionSlice";
import checkboxDataReducer from "./checkboxDataSlice";
import feedbackReducer from "./feedbackSlice";
import feedbackPostReducer from "./feedbackPostSlice";
import collectionReducer from "./collectionSlice";
import uuidReducer from "./uuidSlice";

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
    feedback: feedbackReducer,
    feedbackPost: feedbackPostReducer,
    collection: collectionReducer,
    uuid: uuidReducer,
  },
});

export default store;
