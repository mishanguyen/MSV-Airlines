import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import About from './component/about/About'
import Header from './component/header/Header';
import Footer from './component/footer/Footer';

function App() {
  return (
    <div>
      <Header />
      <About />
      <Footer />
    </div>
  );

  // return (
  //   <div className="App">
  //     <Header />

  //     {/* <Router>
  //         <Routes>
  //           <Route path='/about' element={<About />} />
  //         </Routes>
  //     </Router> */}


  //   </div>
  // );
}

export default App;
