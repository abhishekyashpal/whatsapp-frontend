import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import contactsReducer from "../slices/contactsSlice";
import messagesReducer from "../slices/messagesSlice";
import chatReducer from "../slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    messages: messagesReducer,
    chat: chatReducer,
  },
});

export default store;