import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './components/about/About'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignUp from './components/signUp/SignUp';
import LogIn from './components/logIn/LogIn';
import Booking from './components/flight/BookFlights';
import DeptFlights from './components/flight/DepartureFlights';
import RetFlights from './components/flight/ReturnFlights';

function App() {
  const user =localStorage.getItem("token")
  // const [data, setdata] = React.useState(null);
  // React.useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/user/userinfo", {
  //       headers: {
  //         Authorization: `Bearer ${user}`,
  //       },
  //     })
  //     .then((response) => setdata(response.data))
  //     .catch((error) => console.log(error));
  // },[]);

  return (
      <Router>
        <Header />
        <Routes>
        {!user && <Route path="/" exact element={<LogIn />} />}
        <Route path="/about" exact element={<About />} />
          <Route path="/signup" exact element={<SignUp />}/>
          <Route path="/login" exact element={<LogIn />}/>
          <Route path="/" exact element={<Booking />}/>
          <Route path="/departure/*" exact element={<DeptFlights />} />
          <Route path="/return" exact element={<RetFlights />} />
        </Routes>
        <Footer />
      </Router>
  )
}

export default App;

