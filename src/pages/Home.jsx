import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import MiddleArea from "../components/layout/MiddleArea";
import ChatArea from "../components/layout/ChatArea";
import axios from "axios";

export default function Home() {
  useEffect(() => {
      checkUserLoggedIn();
    }, []);
  const navigate = useNavigate();

  

  const checkUserLoggedIn = () => {
    const mobile = localStorage.getItem("mobile");
    if (!mobile) {
      navigate("/login");
    }
  };
  const getUserRecentChatsDetails = () => {
    const mobile = localStorage.getItem("mobile");
    if (mobile) {
      axios.get(`/api/users/${mobile}/recent-chats`)
        .then(response => {
          // Handle the user recent chats response
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching user recent chats:", error);
        });
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Left Sidebar: Profile & Settings */}
      <div className="w-[6%] border-r border-gray-300">
        <Sidebar />
      </div>

      {/* Middle Sidebar: Chat List */}
      <div className="w-[39%] border-r border-gray-300">
        <MiddleArea />
      </div>

      {/* Chat Area */}
      <div className="flex-1">
        <ChatArea />
      </div>
    </div>
  );
}
