// import "./SignUp.css";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// function SignUp() {
//   const [err, setErr] = React.useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const name = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const role = e.target.elements.role.value; // get the selected radio button value
//     const data = { name, email, password, role }; // add role to the data object
//     try {
//       const url = "http://localhost:5300/api/signup";
//       console.log(data);
//       const { data: res } = await axios.post(url, data);
//       console.log(res.message);
//       navigate("/login");
//     } catch (err) {
//       setErr(true);
//     }
//   }; 
//   return (
//     <div className="SignUpPage">
//       <div className="SignUpContainer">
//         <h1>Sign Up</h1>
//         <div className="SignUpForm">
//           <form className="SignUp" onSubmit={handleSubmit}>
//             <div className="DataInput">
//               <label htmlFor="name">Name: </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Jane"
//                 required
//               ></input>
//             </div>
//             <div className="DataInput">
//               <label htmlFor="email">Email: </label>
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 placeholder="janedoe@gmail.com"
//                 required
//               ></input>
//             </div>
//             <div className="DataInput">
//               <label htmlFor="password">Password: </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 required
//               ></input>
//             </div>
//             <div className="choice">
//               <input type='radio' id='customer' name='role' value='customer'></input>
//               <label htmlFor="customer">Customer</label>
//               <input type='radio' id='employee' name='role' value='employee'></input>
//               <label htmlFor="employee">Employee</label>
//             </div>
//             <div className="SignUpButton">
//               <input
//                 type="submit"
//                 value="sign up"
//                 onSubmit={handleSubmit}
//               ></input>
//             </div>
//           </form>
//           {err && <span>Something went wrong</span>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      // const user = {username: this.state.username, password: this.state.password, userType: this.state.userType};
      const data = {username, password, userType};
      const response = await axios.post("http://localhost:5300/signup", {
          username: username, password: password, userType: userType
      });
      console.log(response.data);

      // axios.post()

      // const response = await axios.get("http://localhost:4000/signup");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
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
    </div>
  );
}

export default SignUp;