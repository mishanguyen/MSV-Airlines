import React from 'react';

function ReturnFlights({ flights, origin, destination, returnDate, onFlightSelect }) {
  const returnFlights = flights.filter(
    (flight) => flight.origin === origin && flight.destination === destination && flight.departuretime.startsWith(returnDate)
  );

  return (
    <div>
      {returnFlights.length === 0 ? (
        <p>No return flights available.</p>
      ) : (
        returnFlights.map((flight) => (
          <div key={returnFlights.indexOf(flight)}>
            <h3>Flight ID: {flight.flightid}</h3>
            <p>Origin: {flight.origin}</p>
            <p>Destination: {flight.destination}</p>
            <p>Departure Time: {flight.departuretime}</p>
            <p>Arrival Time: {flight.arrivaltime}</p>
            <p>Price: ${flight.price}</p>
            <p>Duration: {flight.duration}</p>
            <button onClick={() => onFlightSelect(flight)}>Select</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ReturnFlights;