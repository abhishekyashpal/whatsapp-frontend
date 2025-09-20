import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    conversations: {}, // { chatId: [ { id, senderId, text, timestamp, status } ] }
  },
  reducers: {
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.conversations[chatId] = messages;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.conversations[chatId]) {
        state.conversations[chatId] = [];
      }
      state.conversations[chatId].push(message);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
