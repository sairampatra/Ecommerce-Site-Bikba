import { Turtle } from "lucide-react";
import { useState } from "react";
import ChatBox from "./ChatBox";
import { useStore } from "../../State/store";

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
const {theme}=useStore()
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
    <div className={`${theme} `}>

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
        className="rounded-full w-[50px] h-[50px] bg-[#00BADB] dark:bg-[#6885b1] text-white flex justify-center items-center shadow-xl transition-all duration-300 hover:scale-110"
        onClick={handleChat}
        >
        <Turtle  className="dark:text-[#ECEEF0]" />
      </button>
    </div>
        </div>
  );
}

export default Chatbot;
