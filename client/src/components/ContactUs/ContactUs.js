import React from 'react';
import './ContactUs.css';
import { Button } from '@mui/material';

function ContactUs() {
  return (
    <div className="container">
      <header className="header">
        <h1>Contact Us</h1>
      </header>
      <main className="main">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" placeholder="Enter your message" required></textarea>
          </div>
          <div className='btnContainer'>
            <Button variant='contained'>Submit</Button>
        </div>
        </form>
      </main>
      <footer className="footer">
        <p>MSV Airlines &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContactUs;
