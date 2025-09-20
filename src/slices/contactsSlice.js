import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    list: [], // stores all recent chats or contacts
  },
  reducers: {
    setContacts: (state, action) => {
      state.list = action.payload; // replace entire contact list
    },
    addContact: (state, action) => {
      state.list.push(action.payload); // add new contact
    },
    updateContact: (state, action) => {
      const index = state.list.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    removeContact: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
    }
  },
});

export const { setContacts, addContact, updateContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
