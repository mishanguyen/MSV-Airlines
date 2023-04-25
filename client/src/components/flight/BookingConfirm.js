import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function BookingConfirm({ loggeduser }) {
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

  const handleConfirm = async (event) => {
    console.log(event)
    const departureData = {price: selectedDeparture.price, custid: loggeduser?.custid, flightid: selectedDeparture.flightid, 
      origin: selectedDeparture.origin, destination: selectedDeparture.destination, 
      departuretime: selectedDeparture.departuretime, arrivaltime: selectedDeparture.arrivaltime}
    console.log(departureData)
    let data = {departureData: departureData}
    if (!oneWay){
      const returnData = {price: selectedReturn.price, custid: loggeduser?.custid, flightid: selectedReturn.flightid,
      origin: selectedReturn.origin, destination: selectedReturn.destination, 
    departuretime: selectedReturn.departuretime, arrivaltime: selectedReturn.arrivaltime}
        data = {...data, returnData: returnData}
    }
    console.log("DATA:", data)
    const url = "http://localhost:5200/api/flights/confirmbooking"
    await axios.post(url, data)
    .then((res) => {
      console.log(res)
    }).catch((err) =>{
      console.log(err)
    })

  }

  return (
    <div className="confirm-main-container">
      <h2>Booking Confirmation</h2>
      <p>Customer ID: {loggeduser ? loggeduser.custid : "Not logged in"}</p>
      <div className="departureFlight">
        <h3>
          Inbound Flight: {origin} to {destination} on {departDate}
        </h3>
        <p>Flight Number: {selectedDeparture.flightid}</p>
        <p>
          Route: {selectedDeparture.origin} - {selectedDeparture.destination}
        </p>
        <p>
          Departure Time: {selectedDeparture.departuretime
            .replace("T", " ")
            .substring(0, 16)}
        </p>
        <p>
          Arrival Time: {selectedDeparture.arrivaltime
            .replace("T", " ")
            .substring(0, 16)}
        </p>
        <p>
          Price: ${selectedDeparture.price}
        </p>
      </div>
      {!oneWay && (
        <div className="returnFlight">
          <h3>
            Outbound Flight: {destination} to {origin} on {returnDate}
          </h3>
          <p>Flight Number: {selectedReturn.flightid}</p>
          <p>
            Route: {selectedReturn.origin} - {selectedReturn.destination}
          </p>
          <p>
            Departure Time: {selectedReturn.departuretime.substring(0, 16).replace("T", " ")}
          </p>
          <p>
            Arrival Time: {selectedReturn.arrivaltime.substring(0, 16).replace("T", " ")}
          </p>
          <p>
            Price: ${selectedReturn.price}
          </p>
        </div>
      )}
      <div className="confirmButton">
        <button onClick={handleConfirm}>Confirm Booking</button>
      </div>
    </div>
  );
}

export default BookingConfirm;
