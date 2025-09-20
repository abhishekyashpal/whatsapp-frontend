// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./index.css"; // make sure Tailwind is applied

console.log("Main entry point loaded");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);
