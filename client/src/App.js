
import React, { useState, useEffect } from 'react';

// import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import About from './components/about/About'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignUp from './components/signUp/SignUp';
import LogIn from './components/logIn/LogIn';
import Book from './components/flight/BookFlights';
import BookingConfirm from './components/flight/BookingConfirm'
import DeptFlights from './components/flight/DepartureFlights';
import RetFlights from './components/flight/ReturnFlights';
import MyFlights from './components/MyFlights/MyFlights'
import EditFlights from './components/MyFlights/EditFlights';
import EmpView from './components/employee/EmpView';
import './App.css'
import axios from 'axios';


function App() {
  const user = localStorage.getItem("token")
  const [loggeduser, setUser] = useState(undefined);

  return (
    <Router>
      <Header loggeduser={loggeduser} setUser={setUser}/>
      <div className='main-content'>
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
        <Route path="/myflights" exact element={<MyFlights loggeduser={loggeduser}/>} />
        <Route path="/editflights" exact element={<EditFlights/>}/>
        <Route path="/empview" exact element={<EmpView loggeduser={loggeduser} />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
