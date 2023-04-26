import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./EditFlights.css"
import { Alert, Button, Checkbox } from "@mui/material"
import { useState, useEffect} from "react"
import axios from "axios"

function EditFlights() {
    const location = useLocation()
    const flights = location.state?.flights
    const [newDeparture, setNewDeparture] = useState('')
    const [minDate, setMinDate] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
    }, []);
  
    const handleEdit = async (ticket) => {
        console.log(newDeparture)
        console.log(ticket)
        // const editedflights = flights.filter((flight) => flight != ticket)
        const origin = ticket.origin
        const destination = ticket.destination
        const departDate = newDeparture
        const url = `http://localhost:5200/api/flights/flights?origin=${origin}&destination=${destination}&departureDate=${departDate}`
        try {
            await axios.get(url)
            .then((res) =>{
                if (res.data.rows == 0){
                    setError("There are no flights available for that date. Please try again!")
                } else{
                    navigate("/departure", {state: {editedflights: flights, bookingID: ticket.bookingid, allFlights: res.data.rows, origin: ticket.origin, destination: ticket.destination, departDate: departDate, newDate: true}})
                }
                console.log(res.data.rows)

            })
            .catch((err) => {
                console.log(err)
            })
        } catch (err){
            console.log(err)
        }
    }
    return(
        <div className="edit-flights-main-container">
            <h2>Edit Flights</h2>
            <div className="flights-list">
            {flights.map((ticket) => {
                return(
                <div className="flights" key={ticket.bookingid}> 
                    <h3>Ticket ID: {ticket.bookingid}</h3> 
                    <p>Flight ID: {ticket.flightid}</p>
                    <p>Origin: {ticket.origin}</p>
                    <p>Destination: {ticket.destination} </p>
                    <p>Departure Time: {ticket.departuretime.replace("T", " ").substring(0, 16)}</p>
                    <p>Arrival Time: {ticket.arrivaltime.replace("T", " ").substring(0, 16)}</p>
                    <p>Price: ${ticket.price}</p>
                    <div className='userInput'>
                                <label htmlFor="new-date">Change Departure Date: </label>
                                <input
                                    id="depart-date"
                                    min={minDate}
                                    type="date"
                                    value={newDeparture}
                                    onChange={(event) => setNewDeparture(event.target.value)}
                                    required
                                />
                    </div>
                    <div className="editbutton">
                    <input type="button" value="Edit" className="editBtn" onClick={() => {handleEdit(ticket)}}></input>
                    {error && <Alert style={{width:"auto", marginTop:"10px"}}severity="error">{error}</Alert>}
                    </div>
                    
                </div>
            )})}
            </div>
        </div>
    )
}

export default EditFlights