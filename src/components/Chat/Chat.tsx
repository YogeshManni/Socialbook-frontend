import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../App";
import {
  registerUser,
  listenForMessages,
  sendMessage,
  removeUser,
  removeHandler,
} from "./socket";
import { getUser } from "../../helpers/helper";
import moment from "moment";
import { addMsgTodb, getMessagesFromDb } from "../../services/api";

interface Message {
  text: string;
  from_user: number;
  to_user: number;
  timestamp: string;
}

// Chat component
const Chat = () => {
  const { setChat, chatUser }: any = useContext(ChatContext);
  const msgRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const getMessages = async () => {
    try {
      const data = await getMessagesFromDb({
        from_user: getUser().id,
        to_user: chatUser.id,
      });
      console.log(data);
      setMessages(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Register user on mount
    registerUser();

    // get messages from db
    getMessages();

    // Listen for incoming messages
    const handleMessage = (data: any) => {
      const { message, from } = data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, fromUser: from.id },
      ]);
    };

    listenForMessages(handleMessage);

    return () => {
      // Cleanup listener on unmount
      removeHandler(handleMessage);

      removeUser(); //  remove user on unmount
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = createMessage(input);
      sendMessage({
        from: getUser(),
        to: chatUser.id,
        message: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput(""); // Clear input field
      try {
        await addMsgTodb(newMessage);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const createMessage = (text: string) => ({
    text,
    from_user: getUser().id,
    to_user: chatUser.id,
    timestamp: new Date().toISOString(),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-96 h-[500px] bg-gradient-to-b from-gray-100 to-purple-100 shadow-md rounded-lg flex flex-col z-50 shadow-purple-400">
      {/* Header */}
      <div className="bg-blue-400 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">{chatUser.username}</h3>
        <button
          onClick={() => setChat(false)}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div ref={msgRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-gray-200 rounded-b-lg flex items-center">
        <input
          type="text"
          onKeyDown={handleKeyDown}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSend}
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Component for individual message bubbles
const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex ${
        message.from_user === getUser().id ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg shadow-md ${
          message.from_user === getUser().id
            ? "bg-slate-500 text-white"
            : "bg-blue-500 text-white"
        }`}
      >
        <p>{message.text}</p>
        <span className="block text-xs mt-1 opacity-75 text-right">
          {moment(message.timestamp).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default Chat;
