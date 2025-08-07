import { Plus, MoreVertical, MessageCirclePlus } from "lucide-react";

export default function SidebarMiddle() {
  return (
    <div className="flex flex-col h-full border-r border-gray-300 w-full">
      {/* 1. Top Section - Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h2 className="text-green-600 font-bold text-lg">WhatsApp</h2>
        <div className="flex items-center space-x-4">
          <MessageCirclePlus className="w-6 h-6 cursor-pointer hover:text-blue-500" title="Add" />
          <MoreVertical className="cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      {/* 2. Search Section */}
      <div className="px-4 py-2 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* 3. Filter Buttons Section */}
      <div className="flex justify-between px-4 py-2 border-b border-gray-200 text-sm font-medium">
        <button className="text-gray-600 hover:text-green-600">All</button>
        <button className="text-gray-600 hover:text-green-600">Unread</button>
        <button className="text-gray-600 hover:text-green-600">Favourites</button>
        <button className="text-gray-600 hover:text-green-600">Groups</button>
      </div>

      {/* 4. Chat List Section (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        {/* Replace with actual map of recent chats */}
        {Array.from({ length: 20 }).map((_, idx) => (
          <div
            key={idx}
            className="p-3 bg-white rounded hover:bg-gray-100 cursor-pointer shadow-sm border"
          >
            <h4 className="font-semibold text-sm">Contact {idx + 1}</h4>
            <p className="text-xs text-gray-500">Last message preview...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
