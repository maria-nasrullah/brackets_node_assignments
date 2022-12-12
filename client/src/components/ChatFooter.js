import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        senderId: localStorage.getItem("userId"),
        receiverId: localStorage.getItem("recieverId"),
        status: localStorage.getItem("role"),
        id: `${socket.id}${Math.random()}`,
      });
    }
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
