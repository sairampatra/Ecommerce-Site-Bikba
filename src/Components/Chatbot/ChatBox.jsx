import { useQuery } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";
import { useEffect, useState,useRef } from "react";
import { GEMENAI_APIKEY, SYS_PROMPT } from "../../helpers/constraints";

function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [firstMessageSent, setFirstMessageSent] = useState(true); // Track first message status
  const [loading, setLoading] = useState(true); // Track first message status
  const chatRef = useRef(null);
  const inputRef = useRef(null); // Create a reference for the input field

  const {
    refetch,
    isFetching,
    data: response,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chatData"],
    queryFn: async () => {
      const conversation = history
        .flatMap((entry) => [
          {
            role: "model",
            parts: [
              {
                text:SYS_PROMPT,
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: entry.user }],
          },
          {
            role: "model",
            parts: [{ text: entry.bot }],
          },
        ])
        .concat({
          role: "user",
          parts: [{ text: firstMessageSent ? "hi" : userMessage }],
        });
      console.log(conversation);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMENAI_APIKEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: conversation,
          }),
        }
      );
      
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setFirstMessageSent(false);
      console.log("API Response:", data.candidates[0].content.parts?.[0].text);
      
      return data;
    },
    enabled: false,
    retry: 2,
  });
  useEffect(() => {
    if (response) {
      setLoading(false)

      const botMessage =
        response.candidates[0].content.parts?.[0].text ?? "No response";
      console.log(botMessage);
      setHistory((prev) => {
        if (prev.length === 0) {
          // If history is empty, add a new entry
          return [...prev, { user: userMessage, bot: botMessage }];
        } else {
          // Otherwise, update the last bot response
          const updatedHistory = [...prev];
          updatedHistory[updatedHistory.length - 1].bot = botMessage;
          return updatedHistory;
        }
      }
    
    );
    }

  }, [response]);
  useEffect(() => {
    inputRef.current?.focus()
    refetch();
  }, []);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth", // Makes scrolling smooth
      });
    }
  }, [history]);
  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    setHistory((prev) => [...prev, { user: userMessage, bot: <span className="loading loading-dots  loading-sm mt-2"></span>}]);
    setUserMessage('')

    refetch();
  };
  return (
    <div className=" m-1 bg-[#00badba9] w-[22vw] h-[60vh] rounded-xl p-4   z-[9999] box-border flex flex-col justify-between ">
      {error? <div className="w-full h-[100%] text-red-600 flex justify-center items-center font-semibold ">{error.message}</div>: <div
       ref={chatRef}
      className="overflow-auto scrollbar-hide mb-2 rounded-lg flex flex-col gap items-center">
        {loading &&<span className="loading loading-dots  loading-sm mt-2 mr-[80%]"></span>}
        {history.map((entry, index) => (
          <div
            key={index}
            className="w-full flex flex-col justify-between text-wrap gap-5 mb-2 "
          >
            {entry.user && (
              <div className="max-w-[75%] bg-white break-words whitespace-normal p-1 rounded-lg px-3 self-end">
                {entry.user}
              </div>
            )}
            
            <div className="bg-[#d9d8d8] max-w-[75%] break-words whitespace-normal p-1 rounded-lg px-3 self-start">
              {entry.bot}
            </div>
          </div>
        ))}
        {/* {isFetching && (
          <span className="text-center text-black mt-2 ">Loading...</span>
        )} */}
      </div> }
     
      <div className="w-full border-2 flex gap-2 bg-[#EAE8E9] rounded-lg px-1">
        <input
        ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          value={userMessage}
          type="text"
          className="w-full bg-[#EAE8E9] border-0 outline-0 p-[1px] h-8 items-center"
        />
        <button onClick={handleSendMessage}>
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
