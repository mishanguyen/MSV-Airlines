import React from "react"
import { useLocation } from "react-router-dom"
import "./EditFlights.css"

function EditFlights() {
    const location = useLocation()
    const flights = location.state?.flights
    console.log(flights)
    console.log(flights.map((ticket) => ticket))

    return(
        <div className="edit-flights-main-container">
            <h2>Edit Flights</h2>
            <div className="flights-list">
            {flights.map((ticket) => {
                return(
                <div className="flights" key={ticket.bookingid}> 
                    <h3>Flight ID:{ticket.flightid}</h3> 
                    <p>Booking ID: {ticket.bookingid}</p>
                    <p>Origin: {ticket.origin}</p>
                    <p>Destination: {ticket.destination} </p>
                    <p>Departure Time: {ticket.departuretime.replace("T", " ").substring(0, 16)}</p>
                    <p>Arrival Time: {ticket.arrivaltime.replace("T", " ").substring(0, 16)}</p>
                    <p>Price: ${ticket.price}</p>
                    
                </div>
            )})}
            </div>
        </div>
    )
}

export default EditFlights