import React from 'react';
import { useLocation } from 'react-router-dom';

function FlightResults() {
    const location = useLocation();
    const flights = location.state.flights;

    return (
        <div>
            {flights.map((flight) => (
                <div key={flight.flightid}>
                    <h3>Flight ID: {flight.flightid}</h3>
                    <p>Origin: {flight.origin}</p>
                    <p>Destination: {flight.destination}</p>
                    <p>Departure Time: {flight.departuretime}</p>
                    <p>Arrival Time: {flight.arrivaltime}</p>
                    <p>Price: ${flight.price}</p>
                    <p>Duration: {flight.duration}</p>
                </div>
            ))}
        </div>
    );
}

export default FlightResults;
