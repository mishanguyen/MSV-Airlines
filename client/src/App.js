import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { BrowserRouter as Router, Switch, 
//   Route, Redirect,} from "react-router-dom";
import About from './component/about/About'
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Search from './component/search/Search';
import SignUp from './component/signUp/SignUp';
import { FaRegFileCode } from 'react-icons/fa';
function App() {
  return (
      <Router>
        <Header />
          <Routes>
            <Route path='/search' exact element={<Search/>}/>
            <Route path='/signup' exact element={<SignUp/>}/>
            <Route path='/about' exact element={<About/>}/>
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
