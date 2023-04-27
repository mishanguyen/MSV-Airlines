import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password, 
      userType: userType, 
      fname: fname.replace(/^./, fname[0].toUpperCase()), 
      lname: lname.replace(/^./, lname[0].toUpperCase()), 
      address: address
    };
    console.log(data);
    try {
      const url = "http://localhost:5200/api/users/signup";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  
  return (
    <div className="signupmaincontainer">
      <div className="SignUpPage">
        <div className="SignUpContainer">
          <h1>Sign Up</h1>
          <form className="SignUpForm" onSubmit={handleSignup}>
            {err && (
              <div className="errorSignUp">
                Sorry, username already taken.
              </div>
            )}
            <div className="DataInput">
              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="DataInput">
              <label className="firstName">First Name: </label>
              <input 
                type = "text" 
                value = {fname} 
                onChange={(event) => setFname(event.target.value)}
                required
              />
            </div>
            <div className="DataInput">
              <label>Last Name: </label>
              <input 
                type = "text" 
                value = {lname} 
                onChange={(event) => setLname(event.target.value)}
                required
              />
            </div>
            <div className="DataInput">
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="DataInput">
              <label>Address: </label>
              <input 
                type = "text" 
                value = {address} 
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="DataInput">
              <label>Role: </label>
              <select value={userType} onChange={(event) => setUserType(event.target.value)} required>
                <option value="">Select role</option>
                <option value="customer">Customer</option>
                <option value="employee">Employee</option>
              </select>
            </div>     
            <div className="SignUpButton">
                <input
                  type="submit"
                  value="Sign Up"
                  onSubmit={handleSignup}
                ></input>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;