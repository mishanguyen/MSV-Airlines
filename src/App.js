import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './component/about/About'
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import SignUp from './component/signUp/SignUp';

function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path='/signup' exact element={<SignUp />} />
        <Route path='/about' exact element={<About />} />
      </Routes>
      <Footer />
    </Router>
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
