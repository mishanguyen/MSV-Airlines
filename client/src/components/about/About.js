import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about-section'>
            <img src='https://cdn.dribbble.com/userupload/2608992/file/original-02e424ce013e25d3601879ba3dee12c6.png?resize=400x0' alt='about-logo' className='logo' />
            <div className='about-content'>
                <h2>ABOUT US</h2>
                <p>Welcome to MainTechBS</p>
                <p>We are a small business who offers a management software for flower shop.</p>
                <p>Our software will provide some options for flower tracking, cost management, profit analysis, and employee scheduling.</p>
                <p>Besides, our customers will be able to track sales and profit over time and see how changes in prices affect sales.</p>
            </div>


        </div>
    )
}

export default About