import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DeptFlights() {
    const location = useLocation();
    const allFlights = location.state?.allFlights;
    const origin = location.state?.origin;
    const destination = location.state?.destination;
    const departDate = location.state?.departDate;
    const returnDate = location.state?.returnDate;
    const departureFlights = allFlights.filter(
        (flight) => flight.origin === origin && flight.destination === destination && flight.departuretime.startsWith(departDate)
    );
    const [selectedDeparture, setSelectedDeparture] = useState('');
    const navigate = useNavigate();
    return (
        <div>
        <h2>Departure Flights</h2>
        {departureFlights.map((flight) => (
            <div key={flight.flightid}>
                <h3>Flight ID: {flight.flightid}</h3>
                <p>Origin: {flight.origin}</p>
                <p>Destination: {flight.destination}</p>
                <p>Departure Time: {flight.departuretime}</p>
                <p>Arrival Time: {flight.arrivaltime}</p>
                <p>Price: ${flight.price}</p>
                <p>Duration: {flight.duration}</p>
                <button onClick={() => {
                    setSelectedDeparture(flight);
                    navigate("/return", { 
                        state: { 
                            allFlights: allFlights, 
                            origin: origin, 
                            destination: destination, 
                            departDate: departDate, 
                            returnDate: returnDate, 
                            selectedDeparture: selectedDeparture 
                        }
                    })
                }}
                >Select
                </button>
            </div>
        ))}
        <div>
            <h3>Total Flights: {departureFlights.length}</h3>
            <div>
            <button onClick={() => navigate("/return", { state: { allFlights: allFlights, origin: origin, destination: destination, departDate: departDate, returnDate: returnDate, selectedDeparture: selectedDeparture }})}>Next</button>
            </div>
        </div>
        {/* {flights.length > 0 && <Navigate to="/return" />} */}
        </div>
    );
}

export default DeptFlights;