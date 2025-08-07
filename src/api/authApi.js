import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/api/auth/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/api/auth/login`, data);
  return res.data;
};
