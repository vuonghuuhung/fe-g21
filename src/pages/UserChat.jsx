import axios from "../services/utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import pusher from "../services/utils/pusher";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const headers = {
  Authorization: `Bearer ${token}`,
};

const UserChat = ({ isLogin }) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const watchlistEventHandler = (event) => {
    console.log(event);
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") || null;
    if (!isLogin) {
      navigate("/login");
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
    setUserId(() => userInfo.id);
    pusher.connection.bind("state_change", function (states) {
      console.log("Channels current state is " + states.current);
    });
    pusher.connection.bind("error", function (err) {
      console.log(err);
    });
    try {
      pusher.signin();
      const channel = pusher.subscribe("private-chat-" + userInfo.id);
      channel.bind("new-message", (data) => {
        // console.log(data.user);
        setConversation((prevConversation) => [...prevConversation, data]);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSentMessage = async () => {
    try {
      const response = await axios.post(
        "/api/messages",
        {
          message: message,
          to: 17,
        },
        {
          headers,
        }
      );
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto bg-white shadow-md rounded px-4 py-2">
        <div className="mb-4">
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`mb-2 ${
                item.message.sender_id === userId ? "text-right" : "text-left"
              }`}
            >
              <span className="font-bold">
                {item.message.sender_id === userId ? "You" : "Admin"}:{" "}
              </span>
              <span>{item.message.content}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button
            onClick={handleSentMessage}
            className="bg-blue-500 text-white rounded px-4 py-2 ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
