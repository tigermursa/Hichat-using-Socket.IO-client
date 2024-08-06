import { Link, useParams } from "react-router-dom";
import { mentorsData } from "../../Database/mentorsData";
import { useState } from "react";

const Conversation = () => {
  const { mentorId } = useParams();
  const mentor = mentorsData.find((m) => m.id === mentorId);
  const [messages, setMessages] = useState([
    {
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      sender: "mentor",
      timestamp: "6.30 pm",
    },
    {
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      sender: "user",
      timestamp: "6.34 pm",
    },
    {
      text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      sender: "mentor",
      timestamp: "6.38 pm",
    },
    {
      text: "How are you",
      sender: "mentor",
      timestamp: "6.39 pm",
    },
    {
      text: "I am good you",
      sender: "user",
      timestamp: "6.39 pm",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          text: newMessage,
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  return (
    <div className="flex flex-col w-[70%] mx-auto h-[900px] mt-5 border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex items-center p-4 bg-white border-b border-gray-300">
        <img
          className="w-12 h-12 rounded-full"
          src={mentor.img}
          alt={mentor.name}
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{mentor.name}</h3>
          <p className="text-gray-600 capitalize">{mentor.role}</p>
        </div>
        <div className="ml-auto text-purple-600 font-semibold">
          <Link to={"/"}>
            <h3>Home</h3>
          </Link>
        </div>
      </div>
      <div className="flex flex-col flex-grow bg-gray-100 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded my-1 max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-white self-start text-left"
            }`}
          >
            <p>{msg.text}</p>
            <small className="block text-gray-500 text-xs">
              {msg.timestamp}
            </small>
          </div>
        ))}
      </div>
      <div className="flex p-4 bg-white border-t border-gray-300">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-l"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Conversation;
