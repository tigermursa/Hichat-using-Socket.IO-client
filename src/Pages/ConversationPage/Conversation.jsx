import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Conversation = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "I am mentor how can I help you?",
      sender: "mentor",
      timestamp: "6:30 PM",
    },
    {
      text: "No need, thanks",
      sender: "user",
      timestamp: "6:34 PM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${mentorId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMentor(data);
      } catch (error) {
        console.error("Error fetching mentor:", error);
        setError("Mentor not found");
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [mentorId]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  return (
    <div className="flex flex-col w-[70%] mx-auto h-[900px] mt-5 border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex items-center p-4 bg-white border-b border-gray-300">
        <img
          className="w-12 h-12 rounded-full"
          src={mentor.user.img || "default-image-url"} // Provide a default image URL if necessary
          alt={mentor.user.fullName}
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{mentor.user.fullName}</h3>
          <p className="text-gray-600 capitalize">Mentor</p>
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
