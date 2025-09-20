import { Search, MoreVertical, Send } from "lucide-react";
import { sendMessage } from "../../socket/socket";
import { addMessage } from "../../slices/messagesSlice";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendMessages } from "../../slices/chatSlice";

export default function ChatArea() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const messages = useSelector(
    (state) => state.chat.messages[activeChatId] || []
  );
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); // current user

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (activeChatId) {
      setPage(1);
      setHasMore(true);
      fetchMessages(1);
      // Scroll to bottom after initial load
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [activeChatId]);

  const fetchMessages = async (pageNum) => {
    if (!activeChatId) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/messages/${activeChatId}?page=${pageNum}&limit=20`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      dispatch(
        appendMessages({
          chatId: activeChatId,
          messages: data.messages,
          prepend: pageNum > 1, // only prepend older messages
        })
      );
      setHasMore(data.hasMore);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current.scrollTop === 0 && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      const prevHeight = scrollRef.current.scrollHeight;

      fetchMessages(nextPage).then(() => {
        // Maintain scroll position after loading older messages
        setTimeout(() => {
          scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight - prevHeight;
        }, 50);
      });
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeChatId) return;

    const message = {
      id: Date.now(),
      sender_id: user.id,
      message_text: inputValue,
      sent_at: new Date().toISOString(),
      status: "sending",
    };

    dispatch(addMessage({ chatId: activeChatId, message }));
    sendMessage(activeChatId, inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* 1. Header Section */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center space-x-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm">+91 9876543210</h4>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="cursor-pointer hover:text-gray-600" size={18} />
          <MoreVertical className="cursor-pointer hover:text-gray-600" size={18} />
        </div>
      </div>

      {/* 2. Messages Section */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50"
      >
        {messages.map((msg) => (
          <div
            key={msg.message_id || msg.id}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${
              msg.sender_id === user.id
                ? "bg-blue-100 self-end ml-auto"
                : "bg-green-100 self-start"
            }`}
          >
            {msg.message_type !== "text" && msg.media_url ? (
              <img
                src={msg.media_url}
                alt="Chat Media"
                className="rounded-md mb-1"
              />
            ) : (
              <p>{msg.message_text}</p>
            )}
          </div>
        ))}
      </div>

      {/* 3. Input Section */}
      <div className="px-4 py-3 border-t border-gray-200 sticky bottom-0 bg-white z-10">
        <form
          onSubmit={handleSend}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
