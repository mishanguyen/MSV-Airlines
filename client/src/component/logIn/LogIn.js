import { useState } from "react";
import React from "react";
import "./LogIn.css";
import axios from "axios";

function LogIn() {
  const [err, setErr] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const data = { username, password };
    try {
      const url = "http://localhost:5000/api/users/login";
      const { data: res } = await axios.post(url,data);
      localStorage.setItem("token", res.data);
      window.location="/"
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <h1>Login</h1>
        <div className="LoginForm">
          <form className="LogIn" onSubmit={handleSubmit}>
            <div className="DataInput">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                placeholder="Ex: msvairlines"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
              ></input>
            </div>
            <div className="DataInput">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ex: thebestairline!"
                value={password}
                onChange={handlePasswordChange}
                required
              ></input>
            </div>
            {err && <span className="errorLogin">Email or password might be incorrect. Please try again.</span>}
            <div className="LoginButton">
              <input type="submit" value="Log in" className="submitBtn"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;