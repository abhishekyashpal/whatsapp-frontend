// src/store/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeChatId: null,
    messages: {}, // { chatId: [ {message_id, ...}, ... ] }
  },
  reducers: {
    // Set which chat is currently open
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
    },

    // Clear messages for a chat (used when switching chats)
    resetMessages: (state, action) => {
      const chatId = action.payload;
      state.messages[chatId] = [];
    },

    // Add messages to state
    appendMessages: (state, action) => {
      const { chatId, messages, prepend = false } = action.payload;

      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      // Prepend older messages (pagination)
      if (prepend) {
        state.messages[chatId] = [...messages, ...state.messages[chatId]];
      } else {
        // Append new messages at the bottom
        state.messages[chatId] = [...state.messages[chatId], ...messages];
      }
    },
  },
});

export const { setActiveChatId, resetMessages, appendMessages } = chatSlice.actions;
export default chatSlice.reducer;
