// import React from 'react';
// import { useLocation } from 'react-router-dom';

// function FlightResults() {
//     const location = useLocation();
//     const flights = location.state.flights;

//     return (
//         <div>
//             {!flights.length && (
//                 <div>
//                     <h3>Unfortunately, there are no flights available for the given dates.</h3>
//                 </div>
//             )}
//             {flights.map((flight) => (
//                 <div key={flight.flightid}>
//                     <h3>Flight ID: {flight.flightid}</h3>
//                     <p>Origin: {flight.origin}</p>
//                     <p>Destination: {flight.destination}</p>
//                     <p>Departure Time: {flight.departuretime}</p>
//                     <p>Arrival Time: {flight.arrivaltime}</p>
//                     <p>Price: ${flight.price}</p>
//                     <p>Duration: {flight.duration}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default FlightResults;
import React from "react";
import { useLocation, Navigate, Route, Routes } from "react-router-dom";

function FlightResults() {
  const location = useLocation();
  const flights = location.state?.flights;
  const origin = location.state?.origin;
  if (!flights || flights.length === 0) {
    // if there are no flights, navigate back to the homepage
    return <Navigate to="/" />;
  }

  // separate the departure and return flights
  const departureFlights = flights.filter(
    (flight) => flight.origin === origin
  );
  const returnFlights = flights.filter(
    (flight) => flight.destination === origin
  );

  return (
    <Routes>
      <Route
        path="/"
        element={<DepartureFlights flights={departureFlights} />}
      />
      <Route
        path="/"
        element={<ReturnFlights flights={returnFlights} />}
      />
    </Routes>
  );
}

function DepartureFlights({ flights }) {
  return (
    <div>
      <h2>Departure Flights</h2>
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
      {flights.length > 0 && <Navigate to="/return" />}
    </div>
  );
}

function ReturnFlights({ flights }) {
  return (
    <div>
      <h2>Return Flights</h2>
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