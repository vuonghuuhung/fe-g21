import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import pusher from "../services/utils/pusher";
import axios from "../services/utils/axios";
import { async } from "q";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const headers = {
  Authorization: `Bearer ${token}`,
};

const AdminChat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [isProcessingMessage, setIsProcessingMessage] = useState(false);
  const navigate = useNavigate();
  const watchlistEventHandler = (event) => {
    console.log(event);
    if (event.name === "online") {
      setOnlineUsers((prevState) => {
        const onlineUsers = prevState
          .concat(event.user_ids)
          .filter((value, index, self) => self.indexOf(value) === index);
        return onlineUsers;
      });
    } else {
      setOnlineUsers((prevState) => {
        const onlineUsers = prevState.filter(
          (user) => !event.user_ids.includes(user)
        );
        return onlineUsers;
      });
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") || null;
    if (!isAdmin) {
      navigate("/unauth");
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
      pusher.subscribe("presence-chat");
      pusher.user.watchlist.bind("online", watchlistEventHandler);
      pusher.user.watchlist.bind("offline", watchlistEventHandler);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchChatMessages();
  }, [selectedUser]);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get("/api/messages", { headers });
      //   console.log(response.data);
      setChatMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onlineUsers.forEach((user) => {
      pusher.subscribe("private-chat-" + user).bind("new-message", (data) => {
        setChatMessages((prevMessages) => {
          const messages = [...prevMessages, data.message].filter(
            (value, index, self) => self.indexOf(value) === index
          );
          if (
            data.message.sender_id != selectedUser &&
            prevMessages[prevMessages.length - 1].message != data.message
          ) {
            setUnreadMessages((prevUnreadMessages) => ({
              ...prevUnreadMessages,
              [data.message.sender_id]:
                (prevUnreadMessages[data.message.sender_id] || 0) + 1,
            }));
          }
          return messages;
        });
      });
    });
    console.log(onlineUsers);
  }, [onlineUsers]);

  const handleSentMessage = async () => {
    try {
      const response = await axios.post(
        "/api/admin/messages",
        {
          message: message,
          to: selectedUser,
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

  const handleUserClick = async (userId) => {
    setSelectedUser(userId);
    setUnreadMessages((prevUnreadMessages) => ({
      ...prevUnreadMessages,
      [userId]: 0,
    }));
    setChatMessages(() => {
      const filteredMessages = chatMessages.filter(
        (msg) =>
          (msg.sender_id == 17 && msg.receiver_id == userId) ||
          (msg.sender_id == userId && msg.receiver_id == 17)
      );
      return filteredMessages;
    });
  };

  return (
    <div className="mx-20 flex min-h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Online Users</h2>
        <ul>
          {onlineUsers.map((user) => (
            <li
              key={user}
              className="cursor-pointer text-blue-500 hover:underline mb-2"
              onClick={() => handleUserClick(user)}
            >
              User {user}{" "}
              {unreadMessages[user] > 0 && `(${unreadMessages[user]})`}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-white p-4">
        {selectedUser ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Chat with User {selectedUser}
            </h2>
            <div className="overflow-y-scroll max-h-72">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.sender_id === selectedUser
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  <span className="font-bold">
                    {msg.sender_id === userId ? "Admin: " : "User: "}
                  </span>
                  <p>{msg.content}</p>
                  <p className="text-sm text-gray-400">{msg.created_at}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">Select a user to start a chat</div>
        )}
        <div className="flex items-center mt-4">
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

export default AdminChat;
