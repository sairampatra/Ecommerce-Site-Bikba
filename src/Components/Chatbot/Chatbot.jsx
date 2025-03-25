import { Turtle } from "lucide-react";
import { useState } from "react";
import ChatBox from "./ChatBox";

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChat = () => {
    if (isChatOpen) {
      const userConfirmed = window.confirm(
        "Your current chats will disappear. Do you want to continue?"
      );
      if (!userConfirmed) return;
    }
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      {/* Chatbox with animation */}
      <div
        className={`transition-all duration-300 transform ${
          isChatOpen
            ? " translate-y-0 scale-100"
            : "opacity-0 translate-y-5 scale-95 "
        }`}
      >
        {isChatOpen && <ChatBox />}
      </div>

      {/* Chatbot Button */}
      <button
        className="rounded-full w-[50px] h-[50px] bg-[#00BADB] text-white flex justify-center items-center shadow-xl transition-all duration-300 hover:scale-110"
        onClick={handleChat}
      >
        <Turtle />
      </button>
    </div>
  );
}

export default Chatbot;
