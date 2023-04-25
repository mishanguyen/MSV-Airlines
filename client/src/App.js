// import React, { useState } from 'react';
// // import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import About from './components/about/About'
// import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
// import SignUp from './components/signUp/SignUp';
// import LogIn from './components/logIn/LogIn';
// import Book from './components/flight/BookFlights';
// import BookingConfirm from './components/flight/BookingConfirm'
// import DeptFlights from './components/flight/DepartureFlights';
// import RetFlights from './components/flight/ReturnFlights';


// function App() {
//   const user = localStorage.getItem("token")
//   const [loggeduser, setUser] = useState(undefined)

//   return (
//     <Router>
//       <Header loggeduser={loggeduser} setUser={setUser}/>
//       <Routes>
//         {!user && <Route path="/" exact element={<LogIn loggeduser={loggeduser} setUser={setUser}/>}></Route>}
//         <Route path="/about" exact element={<About />} />
//         <Route path="/signup" exact element={<SignUp loggeduser={loggeduser} setUser={setUser}/>}/>
//         <Route path="/login" exact element={<LogIn loggeduser={loggeduser} setUser={setUser}/>}/>
//         <Route path="/" exact element={<Book />}/>
//         <Route path="/departure/*" exact element={<DeptFlights />} />
//         <Route path="/return/*" exact element={<RetFlights/>} />
//         <Route path="/confirmation" exact element={<BookingConfirm loggeduser={loggeduser} />} />
//       </Routes>
//       <Footer />
//     </Router>
//   )
// }

// export default App;


import React, { useState, useEffect } from 'react';

// import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './components/about/About'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignUp from './components/signUp/SignUp';
import LogIn from './components/logIn/LogIn';
import Book from './components/flight/BookFlights';
import BookingConfirm from './components/flight/BookingConfirm'
import DeptFlights from './components/flight/DepartureFlights';
import RetFlights from './components/flight/ReturnFlights';
import axios from 'axios';


function App() {
  const user = localStorage.getItem("token")
  const [loggeduser, setUser] = useState(undefined);
  
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const { data: res } = await axios.post("http://localhost:5200/api/users/getuserinfo", { token: user });
          setUser(res);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserData();
    } else {
      setUser(undefined);
    }
  }, [user]);
  

  return (
    <Router>
      <Header loggeduser={loggeduser} setUser={setUser}/>
      <Routes>
        <Route
          path="/"
          exact
          element={user ? <Book /> : <LogIn loggeduser={loggeduser} setUser={setUser} />}
        />
        <Route path="/about" exact element={<About />} />
        <Route path="/signup" exact element={<SignUp loggeduser={loggeduser} setUser={setUser}/>}/>
        <Route path="/login" exact element={<LogIn loggeduser={loggeduser} setUser={setUser}/>}/>
        <Route path="/departure/*" exact element={<DeptFlights />} />
        <Route path="/return/*" exact element={<RetFlights/>} />
        <Route path="/confirmation" exact element={<BookingConfirm loggeduser={loggeduser} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
