import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";
import { formatDateTime, getDuration } from "../../helperFunction/helpers"

function BookingConfirm({ loggeduser }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const location = useLocation();
  const origin = location.state?.origin;
  const destination = location.state?.destination;
  const departDate = location.state?.departDate;
  const returnDate = location.state?.returnDate;
  const selectedDeparture = location.state?.selectedDeparture;
  const selectedReturn = location.state?.selectedReturn;
  const newDate = location.state?.newDate
  const bookingID = location.state?.bookingID
  const editedflights = location.state?.editedflights
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('')
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate()
  let oneWay = 1;
  if (selectedReturn) {
    oneWay = 0;
  }

  const handleContinue = () => {
    if (newDate && flag){
      const flights = editedflights.filter((flight) => flight.bookingid != bookingID)
      console.log(editedflights)
      console.log(flights)
      console.log("hihihihi")
      navigate("/editflights", {state: {flights: flights}})
    }
    else{
      navigate("/editflights", {state: {flights: editedflights}})
    }
  }
  const handleConfirm = async (event) => {
    event.preventDefault()
    const departureData = {price: selectedDeparture.price, custid: user.custid, flightid: selectedDeparture.flightid, 
      origin: selectedDeparture.origin, destination: selectedDeparture.destination, 
      departuretime: selectedDeparture.departuretime, arrivaltime: selectedDeparture.arrivaltime}
    var data = {departureData: departureData}
    if (!oneWay){
      const returnData = {price: selectedReturn.price, custid: user.custid, flightid: selectedReturn.flightid,
      origin: selectedReturn.origin, destination: selectedReturn.destination, 
      departuretime: selectedReturn.departuretime, arrivaltime: selectedReturn.arrivaltime}
        data = {...data, returnData: returnData}
    }
    if (newDate){
      var url = "http://localhost:5200/api/flights/updateflight"
      data = {...data, bookingID: bookingID}
    } else{
      var url = "http://localhost:5200/api/flights/confirmbooking"
    }
    await axios.post(url, data)
    .then((res) => {
      if (newDate){
        setMessage("Successfully edited your ticket!")
        setFlag(true)
      } else{
        setMessage("Successfully booked ticket!")
      }
      setSeverity("success")
      console.log(res)
    }).catch((err) =>{
      setMessage("Error booking ticket!")
      setSeverity("error")
      console.log(err)
    })
  }

  return (
    <div className="confirm-main-container">
      <h2>Booking Confirmation</h2>
      <p>Customer ID: {user ? user.custid : "Not logged in"}</p>
      <div className="departureFlight">
        <h3>
          Inbound Flight: {origin} to {destination} on {departDate}
        </h3>
        <p>Flight Number: {selectedDeparture.flightid}</p>
        <p>
          Route: {selectedDeparture.origin} - {selectedDeparture.destination}
        </p>
        <p>
          Departure Time: {formatDateTime(selectedDeparture.departuretime)}
        </p>
        <p>
          Arrival Time: {formatDateTime(selectedDeparture.arrivaltime)}
        </p>
        <p>Duration: {getDuration(selectedDeparture.departuretime, selectedDeparture.arrivaltime)}</p>
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
            Departure Time: {formatDateTime(selectedReturn.departuretime)}
          </p>
          <p>
            Arrival Time: {formatDateTime(selectedReturn.arrivaltime)}
          </p>
          <p>Duration: {getDuration(selectedReturn.departuretime, selectedReturn.arrivaltime)}</p>
          <p>
            Price: ${selectedReturn.price}
          </p>
        </div>
      )}
      <div className="confirmButton">
        <button onClick={handleConfirm}>Confirm Booking</button>
      </div>
      {newDate && <div className="continueButton">
        <button onClick={handleContinue}>Continue Editing</button>
      </div>}
      
      {message && <Alert severity={`${severity}`}>{message}</Alert>}
    </div>
  );
}

export default BookingConfirm;
