import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Flights() {
    const [origin, setOrigin] = useState('');
    const [minDate, setMinDate] = useState('');
    const [destination, setDestination] = useState('');
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [departDate, setDepartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [flights, setFlights] = useState([]);
    
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
    }, []);
  
    useEffect(() => {
        async function fetchOrigins() {
            const response = await axios.get('http://localhost:5000/api/flights/origins');
            setOrigins(response.data);
        }
        fetchOrigins();
    }, []);

    useEffect(() => {
        async function fetchDestinations() {
            const response = await axios.get('http://localhost:5000/api/flights/destinations');
            setDestinations(response.data);
        }
        fetchDestinations();
    }, []);

    const handleOriginChange = (event) => {
        setOrigin(event.target.value);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleRoundTripChange = () => {
        setIsRoundTrip(!isRoundTrip);
    };

    const handleDepartDateChange = (event) => {
        setDepartDate(event.target.value);
    };

    const handleReturnDateChange = (event) => {
        setReturnDate(event.target.value);
    };

    // const handleFlightClassChange = (event) => {
    //     setFlightClass(event.target.value);
    // };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.get(`http://localhost:5000/api/flights/flights?origin=${origin}&destination=${destination}`);
          // filter the flights that match the origin and destination entered by the user
          console.log(response.data.rows);
          setFlights(response.data.rows);
        //   const filteredFlights = response.data.rows.filter((flight) => flight.origin.toLowerCase() === origin.toLowerCase() && flight.destination.toLowerCase() === destination.toLowerCase());
        //   console.log(filteredFlights);
        //   setFlights(filteredFlights);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="App">
            <h1>Flight Booking</h1>
            <div>
                <label htmlFor="origin">Origin:</label>
                <select id="origin" value={origin} onChange={handleOriginChange}>
                    <option value="">Select origin</option>
                        {origins.map((city) => (
                        <option key={city.code} value={city.code}>
                            {city.code} - {city.name}
                        </option>
                        ))}
                </select>
            </div>
            <div>
                <label htmlFor="destination">Destination:</label>
                <select
                    id="destination"
                    value={destination}
                    onChange={handleDestinationChange}
                >
                    <option value="">Select destination</option>
                    {destinations.map((city) => (
                    <option key={city.code} value={city.code}>
                        {city.code} - {city.name}
                    </option>
                ))}
                </select>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={!isRoundTrip}
                        onChange={handleRoundTripChange}
                    />
                    One way
                </label>
            </div>
            <div>
                <label htmlFor="depart-date">Depart date:</label>
                <input
                    id="depart-date"
                    type="date"
                    min={minDate}
                    value={departDate}
                    onChange={handleDepartDateChange}
                />
            </div>
            {isRoundTrip && (
                <div>
                    <label htmlFor="return-date">Return date:</label>
                    <input
                        id="return-date"
                        min={minDate}
                        type="date"
                        value={returnDate}
                        onChange={handleReturnDateChange}
                    />
                </div>
            )}
            {/* <div>
                <label htmlFor="class">Class:</label>
                <select id="class" value={flightClass} onChange={handleFlightClassChange}>
                {classes.map((flightClass) => (
                    <option key={flightClass} value={flightClass}>
                    {flightClass}
                    </option>
                ))}
                </select>
            </div> */}
            <button onClick={handleSearch}>
                Search
            </button>
            <button onClick={() => {
                const temp = origin;
                setOrigin(destination);
                setDestination(temp);
            }}>
                Switch Origin/Destination
            </button>
            <div>
                {flights.map((flight) => (
                <div key={flights.indexOf(flight)}>
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
        </div>
    );
}

export default Flights;