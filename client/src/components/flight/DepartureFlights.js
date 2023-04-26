import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DeptFlights() {
    const location = useLocation();
    const allFlights = location.state?.allFlights;
    const origin = location.state?.origin;
    const destination = location.state?.destination;
    const departDate = location.state?.departDate;
    const returnDate = location.state?.returnDate;
    const newDate = location.state?.newDate
    const bookingID = location.state?.bookingID
    const editedflights = location.state?.editedflights
    const departureFlights = allFlights.filter(
        (flight) => flight.origin === origin && flight.destination === destination && flight.departuretime.startsWith(departDate)
    );
    const returnFlights = allFlights.filter(
        (flight) => flight.origin === destination && flight.destination === origin && flight.departuretime.startsWith(returnDate)
    );
    let oneWay = 0;
    if (returnFlights.length === 0) {
        oneWay = 1;
    }
    const [selectedDeparture, setSelectedDeparture] = useState(undefined);
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
                        !oneWay &&
                            navigate("/return", { 
                                state: { 
                                    allFlights: allFlights, 
                                    origin: origin, 
                                    destination: destination, 
                                    departDate: departDate, 
                                    returnDate: returnDate, 
                                    selectedDeparture: flight
                                }
                            })
                        oneWay && (
                            navigate("/confirmation", { 
                                state: { 
                                    allFlights: allFlights, 
                                    origin: origin, 
                                    destination: destination, 
                                    departDate: departDate, 
                                    returnDate: returnDate, 
                                    selectedDeparture: flight, 
                                    newDate: newDate,
                                    bookingID: bookingID,
                                    editedflights: editedflights
                                }
                            })
                        )
                    }}
                    >Select
                    </button>
                </div>
            ))}
            <div>
                <h3>Total Flights: {departureFlights.length}</h3>
                
                { !oneWay && 
                    (<div>
                    <button onClick={() => navigate("/return", 
                        { state: { 
                            allFlights: allFlights, 
                            origin: origin, 
                            destination: destination, 
                            departDate: departDate, 
                            returnDate: returnDate, 
                            selectedDeparture: selectedDeparture 
                            }
                        }
                    )}
                    >
                        Next
                    </button>
                    </div>)
                }
            </div>
        </div>
    );
}

export default DeptFlights;