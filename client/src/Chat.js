import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import logo from "./assets/icon.png";
let socket;
let senderId;
let receiverId;
let status;
let messageArea;
do {
  senderId = prompt("Please enter your id :");
  receiverId = prompt("Please enter frnd's id :");
  status = prompt("Please provide your status");
} while ((!senderId, !receiverId, !status));
const Chat = () => {
  const ref = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("*** rendering ***")
    
    //connect socket
    messageArea = document.querySelector("#area");
    const c = ref.current;
    socket = io("http://localhost:3990");
    socket.on("message", (data) => {
      console.log(data);
      

      if (data.receiverId === senderId) {
        
       appendMessage(data, "incoming");
      return 0;
      }

      

      scrollToBottom();
    });
  });
  const appendMessage = (message, type) => {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add(type, "message");
    let markup = `
    <h5>${message.senderId}</h5>
   <p>${message.text}</p>
    `;
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
  };
  //send message
  const sendMessage = (event) => {
    event.preventDefault();
    let message = {
      senderId,
      receiverId,
      text: text.trim(),
    };
    socket.emit("message", message);
    setText("");
    appendMessage(message, "outgoing");
    scrollToBottom();
  };
  //set scrolling
  const scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
  };
  return (
    <>
      <div className="brand">
        <img src={logo} alt="icon" />
        <h1>MyChat</h1>
      </div>
      <div id="area" ref={ref}></div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={text}
          onChange={(newText) => setText(newText.target.value)}
        />
      </form>
    </>
  );
};

export default Chat;
