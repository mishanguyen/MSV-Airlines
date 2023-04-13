import React, { useEffect, useState } from 'react'
// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './component/about/About'
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Flights from './component/flight/Flight';
import SignUp from './component/signUp/SignUp';
import LogIn from './component/logIn/LogIn';


function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/api/users").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/about" exact element={<About />} />
          <Route path="/search" exact element={<Flights />} />
          <Route path="/signup" exact element={<SignUp />}/>
          <Route path="/login" exact element={<LogIn />}/>
        </Routes>
        <Footer />
      </Router>
  )
}

export default App;

