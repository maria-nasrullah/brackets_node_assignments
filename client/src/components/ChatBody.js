import React from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, lastMessageRef }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Appointments Discussion</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((msg) =>
          msg.senderId === localStorage.getItem("userId") ? (
            /*This shows messages sent from you*/
            <div className="message__chats" key={msg.id} ref={lastMessageRef}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{msg.text}</p>
              </div>
            </div>
          ) : msg.senderId == localStorage.getItem("recieverId") ? (
            /*This shows messages received by you*/
            <div className="message__chats" key={msg.id} ref={lastMessageRef}>
              <p>{localStorage.getItem("recieverName")}</p>
              <div className="message__recipient">
                <p>{msg.text}</p>
              </div>
            </div>
          ) : (
            <div></div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        {/* <div className="message__status" >
          <p>Someone is typing...</p>
        </div> */}
      </div>
    </>
  );
};

export default ChatBody;
