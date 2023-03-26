import React, { useState } from 'react';
import axios from 'axios';

function Flights() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flights, setFlights] = useState([]);

  // const handleSearch = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.get(`http://localhost:5300/flights?origin=${origin}&destination=${destination}`);
  //     setFlights(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5300/flights?origin=${origin}&destination=${destination}`);
      // filter the flights that match the origin and destination entered by the user
      const filteredFlights = response.data.filter((flight) => flight.origin === origin && flight.destination === destination);
      setFlights(filteredFlights);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Search for Flights</h2>
      <form onSubmit={handleSearch}>
        <label>
          Origin:
          <input type="text" value={origin} onChange={(event) => setOrigin(event.target.value)} />
        </label>
        <br />
        <label>
          Destination:
          <input type="text" value={destination} onChange={(event) => setDestination(event.target.value)} />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
      <div>
        {flights.map((flight) => (
          <div key={flight.flightid}>
            <h3>Flight ID: {flight.flightid}</h3>
            <p>Origin: {flight.origin}</p>
            <p>Destination: {flight.destination}</p>
            <p>Departure Time: {flight.departuretime}</p>
            <p>Arrival Time: {flight.arrivaltime}</p>
            <p>Number of Passengers: {flight.numberpassengers}</p>
            <p>Flight Status: {flight.flightstatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flights;