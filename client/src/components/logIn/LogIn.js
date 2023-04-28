import { useState } from "react";
import React from "react";
import "./LogIn.css";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import { Link, Alert} from "@mui/material";

function LogIn ({loggeduser, setUser}){
  const [err, setErr] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("clicked submit");
    e.preventDefault();
    try {
      const data = { username, password };
      const url = "http://localhost:5200/api/users/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      await axios
        .post("http://localhost:5200/api/users/getuserinfo", data)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data))
          setUser(JSON.stringify(res.data));
          if (res.data.type === 'employee') {
            navigate('/empview'); // Navigate to the employee view page
          } else {
            navigate('/'); // Navigate to the home page
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
                placeholder="MSV Airlines"
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
                placeholder="TheBestAirline!"
                value={password}
                onChange={handlePasswordChange}
                required
              ></input>
            </div>
            {err && <Alert classname="errorLogin" variant="outlined" severity="error">Incorrect user credentials. Please try again.</Alert>}
            <div className="LoginButton">
              <input type="submit" value="Log in" className="submitBtn"></input>
            </div>
            <div className="SignUpButton">
              <Link href="/signup" variant="body">Don't have an account? Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;