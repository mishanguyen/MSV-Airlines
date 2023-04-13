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
      fname: fname, 
      lname: lname, 
      address: address
    };
    try {
      const url = "http://localhost:5000/api/users/signup";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  
  return (
    <div className="SignUpPage">
      <div className="SignUpContainer">
        <h1>Sign Up</h1>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label className="firstName">First Name: </label>
        <input 
          type = "text" 
          value = {fname} 
          onChange={(event) => setFname(event.target.value)}
        />
        <label>Last Name: </label>
        <input 
          type = "text" 
          value = {lname} 
          onChange={(event) => setLname(event.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label>Address: </label>
        <input 
          type = "text" 
          value = {address} 
          onChange={(event) => setAddress(event.target.value)}
        />
        <label>User type: </label>
        <select value={userType} onChange={(event) => setUserType(event.target.value)}>
          <option value="">Select user type</option>
          <option value="customer">Customer</option>
          <option value="employee">Employee</option>
        </select>
        <button onClick={handleSignup}>Sign Up</button>

        {err && (
          <span className="success-message">
            Error registering the user.
          </span>
        )}

      </div>
    </div>
  );
}

export default SignUp;