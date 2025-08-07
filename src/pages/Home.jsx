import Sidebar from "../components/layout/Sidebar";
import MiddleArea from "../components/layout/MiddleArea";
import ChatArea from "../components/layout/ChatArea";

export default function Home() {
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
