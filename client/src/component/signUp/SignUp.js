import "./SignUp.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function SignUp() {
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const data = { name, email, password };
    try {
      const url = "http://localhost:5300/api/user/signup";
      const { data: res } = await axios.post(url,data);
      console.log(res.messsage);
      navigate("/login")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div class="SignUpPage">
      <div className="SignUpContainer">
        <h1>Sign Up</h1>
        <div className="SignUpForm">
          <form className="SignUp" onSubmit={handleSubmit}>
            <div className="DataInput">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Jane"
                required
              ></input>
            </div>
            <div className="DataInput">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="janedoe@gmail.com"
                required
              ></input>
            </div>
            <div className="DataInput">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                required
              ></input>
            </div>
            <div className="SignUpButton">
              <input
                type="submit"
                value="sign up"
                onSubmit={handleSubmit}
              ></input>
            </div>
          </form>
          {err && <span>Something went wrong</span>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
