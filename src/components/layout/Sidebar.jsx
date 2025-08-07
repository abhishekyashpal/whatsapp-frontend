import {
  MessageSquare,
  MessageCircleDashed,
  CircleDashed,
  Circle,
  Users,
  Radio,
  Bot,
  Settings,
  User,
  DotSquare,
} from "lucide-react";

export default function SidebarLeft() {
  return (
    <div className="flex flex-col justify-between h-full p-4">
      {/* Top Icons */}
      <div className="flex flex-col items-center space-y-6">
        <MessageSquare className="w-6 h-6 cursor-pointer hover:text-green-500" title="Chats" />
        <CircleDashed className="w-6 h-6 cursor-pointer hover:text-green-500" title="Status" />
        <MessageCircleDashed className="w-6 h-6 cursor-pointer hover:text-green-500" title="Channels"/>
        <Users className="w-6 h-6 cursor-pointer hover:text-green-500" title="Communities" />
        

        {/* Divider */}
        <div className="w-8 border-t border-gray-300 mt-4"></div>

        {/* Meta AI */}
        <Bot className="w-6 h-6 mt-4 cursor-pointer hover:text-purple-500" title="Meta AI" />
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col items-center space-y-6">
        <Settings className="w-6 h-6 cursor-pointer hover:text-blue-500" title="Settings" />
        <User className="w-6 h-6 cursor-pointer hover:text-blue-500" title="Profile" />
      </div>
    </div>
  );
}

