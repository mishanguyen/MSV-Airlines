import React from "react";
import { useLocation } from "react-router-dom";

function BookingConfirm(){
    const location = useLocation();
    const origin = location.state?.origin;
    const destination = location.state?.destination;
    const departDate = location.state?.departDate;
    const returnDate = location.state?.returnDate;
    const selectedDeparture = location.state?.selectedDeparture;
    const selectedReturn = location.state?.selectedReturn;
    let oneWay = 1;
    if (selectedReturn) {
        oneWay = 0;
    }

    return (
        <div className="confirm-main-container">
            <h2>Booking Confirmation</h2>
            <div className="departureFlight">
                <h3>Inbound Flight: {origin} to {destination} on {departDate}</h3>
                <p>Flight Number: {selectedDeparture.flightid}</p>
                <p>Route: {selectedDeparture.origin} - {selectedDeparture.destination}</p>
                <p>Departure Time: {selectedDeparture.departuretime.replace('T', ' ').substring(0, 16)}</p>
                <p>Arrival Time: {selectedDeparture.arrivaltime.replace('T', ' ').substring(0, 16)}</p>
            </div>
            {!oneWay && (
                <div className="returnFlight">
                <h3>Outbound Flight: {destination} to {origin} on {returnDate}</h3>
                <p>Flight Number: {selectedReturn.flightid}</p>
                <p>Route: {selectedReturn.origin} - {selectedReturn.destination}</p>
                <p>Departure Time: {selectedReturn.departuretime.substring(0, 16)}</p>
                <p>Arrival Time: {selectedReturn.arrivaltime.substring(0, 16)}</p>
            </div>
            )}
            <div className="confirmButton">
                <button>Confirm Booking</button>
            </div>
        </div>
    )

}

export default BookingConfirm; 