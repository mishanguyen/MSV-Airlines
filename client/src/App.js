import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './component/about/About'
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import SignUp from './component/signUp/SignUp';
import LogIn from './component/logIn/LogIn';
import Book from './component/flight/bookFlights';
import Results from './component/flight/searchResults'
import DepartureFlights from './component/flight/DepartureFlights';
import ReturnFlights from './component/flight/ReturnFlights';

function App() {

  return (
      <Router>
        <Header />
        <Routes>
        <Route path="/about" exact element={<About />} />
          <Route path="/signup" exact element={<SignUp />}/>
          <Route path="/login" exact element={<LogIn />}/>
          <Route path="/" exact element={<Book />}/>
          <Route path="/search-results" exact element={<Results />} />
          <Route path="/departure-flights" exact element={<DepartureFlights />} />
          <Route path="/return-flights" exact element={<ReturnFlights />} />
        </Routes>
        <Footer />
      </Router>
  )
}

export default App;

