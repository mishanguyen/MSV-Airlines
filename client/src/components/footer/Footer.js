import React from 'react';
import './Footer.css';
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
                    <p>Phone: (813) 974 1111</p>
                    <p>Email: support@msvairlines.com</p>
                </div>
            </div>

            {/*Business Hour */}
            <div className='business-section'>
                <div className='row'>
                    <h3>Business Hours</h3>
                </div>
                <div className='row'>
                    <p>Sunday - Saturday: 24/7</p>
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