import React from 'react';

function DepartureFlights({ flights, origin, destination, departDate, onFlightSelect }) {
  const departureFlights = flights.filter(
    (flight) => flight.origin === origin && flight.destination === destination && flight.departuretime.startsWith(departDate)
  );

  return (
    <div>
      {departureFlights.map((flight) => (
        <div key={flight.flightid}>
          <h3>Flight ID: {flight.flightid}</h3>
          <p>Origin: {flight.origin}</p>
          <p>Destination: {flight.destination}</p>
          <p>Departure Time: {flight.departuretime}</p>
          <p>Arrival Time: {flight.arrivaltime}</p>
          <p>Price: ${flight.price}</p>
          <p>Duration: {flight.duration}</p>
          <button onClick={() => onFlightSelect(flight)}>Select</button>
        </div>
      ))}
    </div>
  );
}

export default DepartureFlights;
