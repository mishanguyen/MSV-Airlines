import React from 'react';
import './footer.css';
import { FaCcVisa, FaPaypal, FaCcMastercard, FaApplePay } from 'react-icons/fa';


function Footer() {
    return (
        <div className='footer-section'>
            {/*Contact */}
            <div className='contact-section'>
                <div className='row'>
                    <h3>Contact Us</h3>
                </div>
                <div className='row'>
                    <p>4202 E Fowler Ave, Tampa, FL 33620</p>
                </div>
                <div className='row'>
                    <p>Phone: (111) 222 3333</p>
                    <p>Email: maintechBS@gmail.com</p>
                </div>
            </div>

            {/*Business Hour */}
            <div className='business-section'>
                <div className='row'>
                    <h3>Business Hour</h3>
                </div>
                <div className='row'>
                    <p>Monday - Friday: 9am - 5pm</p>
                    <p>Saturday: 8am - 2pm</p>
                    <p>Sunday: Closed</p>
                </div>
            </div>

            <div className='payment-section'>
                <div className='row'>
                    <h3>Payment Options</h3>
                </div>
                <div className='row'>
                    <li><FaCcVisa size={32} /></li>
                    <li><FaPaypal size={32} /></li>
                    <li><FaCcMastercard size={32} /></li>
                    <li><FaApplePay size={32} /></li>
                </div>
            </div>

        </div>
    );
}

export default Footer;
