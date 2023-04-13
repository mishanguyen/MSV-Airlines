import React, { useState } from "react";
import axios from "axios";
import './SignUp.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", {
          username: username, password: password, userType: userType, fname: fname, lname: lname, address: address
      });

      console.log(response);
      
      if (response.data.message) {
        setSuccessMessage(response.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <label>
        Username: 
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label className="firstName">
        First Name: 
        <input type = "text" value = {fname} onChange={(event) => setFname(event.target.value)}/>
      </label>
      <label>
        Last Name: 
        <input type = "text" value = {lname} onChange={(event) => setLname(event.target.value)}/>
      </label>

      <br />
      <label>
        Password 
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Address: 
        <input type = "text" value = {address} onChange={(event) => setAddress(event.target.value)}/>
      </label>
      <br />

      <label>
        User type: 
        <select value={userType} onChange={(event) => setUserType(event.target.value)}>
          <option value="">Select user type</option>
          <option value="customer">Customer</option>
          <option value="employee">Employee</option>
        </select>
      </label>
      <br />
      <button onClick={handleSignup}>Sign Up</button>

      {successMessage ? (
  <div className="success-message">
    {successMessage}
  </div>
) : null}

    </div>
  );
}

export default Signup;