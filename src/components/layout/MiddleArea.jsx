import { useEffect, useState } from "react";
import { Plus, MoreVertical, MessageCirclePlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChatId, resetMessages  } from "../../slices/chatSlice";


export default function SidebarMiddle() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // assuming you store JWT here
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mobile = localStorage.getItem("mobile");
    if (!mobile) {
      console.error("No mobile number found in localStorage");
      return;
    }
    fetchChats(mobile);
  }, []);

  const handleChatClick = (chatId) => {
    dispatch(setActiveChatId(chatId));     // select chat
    dispatch(resetMessages(chatId));       // clear old messages so new ones load fresh
  };

  const fetchChats = async (mobile) => {
    console.log('called')
      try {
        console.log(`http://localhost:5000/api/chats/recent?mobile=${mobile}`)
        const res = await fetch(
          `http://localhost:5000/api/chats/recent?mobile=${mobile}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setRecentChats(data);
      } catch (err) {
        console.error("Error fetching recent chats:", err);
      } finally {
        setLoading(false);
      }
    };

  // const handleChatClick = async (chatId) => {
  //   console.log('get chat history')
  //   dispatch(setActiveChatId(chatId));
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/messages/${chatId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const messages = await res.json();
  //     dispatch(setMessages({ chatId, messages }));
  //   } catch (err) {
  //     console.error("Error fetching messages:", err);
  //   }
  // };

  return (
    <div className="flex flex-col h-full border-r border-gray-300 w-full">
      {/* 1. Top Section - Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h2 className="text-green-600 font-bold text-lg">WhatsApp</h2>
        <div className="flex items-center space-x-4">
          <MessageCirclePlus
            className="w-6 h-6 cursor-pointer hover:text-blue-500"
            title="Add"
          />
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

      {/* 4. Chat List Section */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        {loading ? (
          <div className="text-gray-500">Loading chats...</div>
        ) : recentChats.length === 0 ? (
          <div className="text-gray-500">No recent chats</div>
        ) : (
          recentChats.map((chat) => {
            const isGroup = chat.is_group === 1 || chat.is_group === true;
            const name = isGroup
              ? chat.chat_group_name
              : chat.other_user?.user_name || "Unknown";
            const lastMessage =
              chat.message_type === "text"
                ? chat.message_text
                : `[${chat.message_type}]`;

            return (
              <div
                key={chat.chat_id}
                onClick={() => handleChatClick(chat.chat_id)}
                className="p-3 bg-white rounded hover:bg-gray-100 cursor-pointer shadow-sm border"
              >
                <h4 className="font-semibold text-sm">{name}</h4>
                <p className="text-xs text-gray-500 truncate">{lastMessage}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
