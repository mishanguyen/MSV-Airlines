import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function RetFlights() {
    const location = useLocation();
    const allFlights = location.state?.allFlights;
    const origin = location.state?.origin;
    const destination = location.state?.destination;
    const departDate = location.state?.departDate;
    const returnDate = location.state?.returnDate;
    const selectedDeparture = location.state?.selectedDeparture;
    const [selectedReturn, setSelectedReturn] = useState('');
    const returnFlights = allFlights.filter(
        (flight) => flight.origin === destination && flight.destination === origin && flight.departuretime.startsWith(returnDate)
    );
    const navigate = useNavigate();
    return (
      <div>
        <h2>Return Flights</h2>
        {returnFlights.map((flight) => (
          <div key={flight.flightid}>
            <h3>Flight ID: {flight.flightid}</h3>
            <p>Origin: {flight.origin}</p>
            <p>Destination: {flight.destination}</p>
            <p>Departure Time: {flight.departuretime}</p>
            <p>Arrival Time: {flight.arrivaltime}</p>
            <p>Price: ${flight.price}</p>
            <p>Duration: {flight.duration}</p>
            <button onClick={() => {
                    setSelectedReturn(flight);
                    navigate("/confirmation", { 
                      state: { 
                        allFlights: allFlights, 
                        origin: origin, 
                        destination: destination, 
                        departDate: departDate, 
                        returnDate: returnDate, 
                        selectedDeparture: selectedDeparture, 
                        selectedReturn: flight
                      }
                    })
            }}
            >Select
            </button>
          </div>
        ))}
      </div>
    );
  }

export default RetFlights;