import io from "socket.io-client";
import { addMessage } from "../slices/messagesSlice";

let socket;

export const connectSocket = (token, store) => {
  socket = io("http://localhost:5000", {
    auth: { token }, // Pass JWT token for auth
  });

  socket.on("connect", () => {
    console.log("✅ Connected to WebSocket");
  });

  socket.on("receive_message", (data) => {
    store.dispatch(addMessage({ chatId: data.chatId, message: data }));
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from WebSocket");
  });
};

export const sendMessage = (chatId, text) => {
  if (socket) {
    socket.emit("send_message", { chatId, text });
  }
};
