import React from 'react'
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

  return (
      <Router>
        <Header />
        <Routes>
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

