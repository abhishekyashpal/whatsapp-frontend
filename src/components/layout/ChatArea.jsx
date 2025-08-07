import { Search, MoreVertical, Send } from "lucide-react";

export default function ChatArea() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* 1. Header Section (fixed) */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
        {/* Left: Profile Picture + Name */}
        <div className="flex items-center space-x-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm">+91 9876543210</h4>
            {/* You can show online/offline status or last seen here */}
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          <Search className="cursor-pointer hover:text-gray-600" size={18} />
          <MoreVertical className="cursor-pointer hover:text-gray-600" size={18} />
        </div>
      </div>

      {/* 2. Chat Messages Section (scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50">
        {Array.from({ length: 20 }).map((_, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${
              idx % 2 === 0
                ? "bg-green-100 self-start"
                : "bg-blue-100 self-end ml-auto"
            }`}
          >
            {idx % 5 === 0 ? (
              <img
                src="https://via.placeholder.com/150"
                alt="Chat Media"
                className="rounded-md mb-1"
              />
            ) : (
              <p>Hello! This is message {idx + 1}</p>
            )}
          </div>
        ))}
      </div>

      {/* 3. Input Section (fixed) */}
      <div className="px-4 py-3 border-t border-gray-200 sticky bottom-0 bg-white z-10">
        <form className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          
            <Send type="submit"
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600" size={45} />
         
        </form>
      </div>
    </div>
  );
}
