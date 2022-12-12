import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../redux/userSlice";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync({ email, password }));
    //sends the username and socket ID to the Node.js server
    socket.emit("newUser", { email, socketID: socket.id });
    navigate("/members");
  };
  console.log(user.loginUser);
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>

      <label htmlFor="username">Email</label>
      <input
        type="email"
        minLength={6}
        name="email"
        id="username"
        className="username__input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="username">Password</label>
      <input
        type="password"
        name="password"
        id="username"
        className="username__input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;
