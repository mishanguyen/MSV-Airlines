import React from 'react'
// import { BrowserRouter as Router, Switch, 
//     Route, Redirect,} from "react-router-dom";
import './header.css'
import logo from './logo.png'
console.log(logo);

function Header({}) {
    return (
        <header>
            <nav className='nav'>
                {/* <a href='/' className='airline-name'>MSV Airline</a> */}
                <img src={logo} alt='logo' className='logo'/>
                <ul>
                    <li>
                        <a href='/home'>Home</a>
                    </li>

                    <li>
                        <a href='/about'>About Us</a>
                    </li>
                    <li>
                        <a href='/search'>Search Flight</a>
                    </li>

                    <li>
                        <a href='/myflight'>My Flight</a>
                    </li>

                    <li>
                        <a href='/signup'>Sign Up</a>
                    </li>

                    <li>
                        <a href='/login'>Log In</a>
                    </li>

                    <li>
                        <a href='/contact'>Contact Us</a>
                    </li>

                </ul>
            </nav>
        </header>


    );

    {/* <nav className='narbar'>
            <div className='narbar-container'>
                <h1>Hello</h1>
            </div>
        </nav> */}
}

export default Header