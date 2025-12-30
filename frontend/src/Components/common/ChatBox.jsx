// components/common/ChatBox.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ChatBox.css"; // you can reuse one CSS
import API_BASE_URL from "../../config/api"; 

const ChatBox = ({ currentUser, chatWith, title }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    if (!currentUser?.name || !chatWith?.name) return;

    fetch(
      `${API_BASE_URL}/api/messages/${currentUser.name}/${chatWith.name}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
            setMessages(data);
        } else {
            setMessages([]);
        }})
      .catch((err) => console.error("Error fetching messages:", err));
  }, [currentUser, chatWith]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const payload = {
      sender: currentUser.name,
      receiver: chatWith.name,
      content: newMsg,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const saved = await res.json();
      setMessages((prev) => [...prev, saved]);
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">💬 {title}</div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <motion.div
            key={msg._id || i}
            className={`message ${
              msg.sender === currentUser.name ? "sent" : "received"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {msg.content}
          </motion.div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="chat-send-btn"  onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
