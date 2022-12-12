import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAsync } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const ChatBar = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.userReducer.users);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    socket.on("newUserResponse", () => console.log(users));
  }, [socket, users]);
  console.log(users);
  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);
  const systemUsers = users?.filter((user) => user._id !== userId);

  const handleOnClick = (e, id, name) => {
    e.preventDefault();
    localStorage.setItem("recieverId", id);
    localStorage.setItem("recieverName", name);
    navigate("/chat");
  };

  return (
    <div className="chat__sidebar">
      <h2>MD Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          <ul>
            {systemUsers?.map((user) => (
              <i
                onClick={(event) =>
                  handleOnClick(event, user._id, user.firstName)
                }
              >
                <li key={user._id}>
                  {user.firstName} {user.lastName}
                </li>
              </i>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
