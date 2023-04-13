import React from 'react'
import './header.css'
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';
console.log(logo);

function Header() {
    const isLoggedIn = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header>
            <nav className='nav'>
                <img src={logo} alt='logo' className='logo'/>
                <ul>
                    <li>
                        <a href='/'>Home</a>
                    </li>

                    <li>
                        <a href='/about'>About Us</a>
                    </li>
{/* 
                    <li>
                        <a href='/search'>Search Flight</a>
                    </li> */}

                    <li>
                        <a href='/myflight'>My Flight</a>
                    </li>

                    <li>
                        <a href='/contact'>Contact Us</a>
                    </li>
                    {!isLoggedIn && (<li>
                        <a href='/signup'>Sign Up</a>
                    </li>)}

                    {!isLoggedIn && (<li>
                        <a href='/login'>Log In</a>
                    </li>)}
                    <li>
                        {isLoggedIn && (
                            <li>
                            <a href="/login" onClick={handleLogout}>Logout</a>
                            </li>
                        )}
                    </li>

                </ul>
            </nav>
        </header>


    );
}

export default Header;