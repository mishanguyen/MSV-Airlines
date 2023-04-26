import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Button, Checkbox } from "@mui/material"
import './MyFlights.css'
function MyFlights( {loggeduser} ) {
    const user = JSON.parse(localStorage.getItem('user'))
    const [flights, setFlights] = useState([])
    const [selected, setSelected] = useState([])
    const navigate = useNavigate()
    
    const selectAll = (event) => {
        const status = event.target.checked
        console.log(event.target.checked)
        if (status){
            setSelected([...flights])
        }
        else{
            setSelected([])
        }
    }
    const handleChange = (flight) => {
        // console.log(flight)
        if (selected.includes(flight)){
            setSelected(selected.filter((selected) => selected !== flight))
        }
        else{
            setSelected([...selected, flight])
        }
    }
    const handleSubmit = async (event) =>{
        console.log(event.target.id)
        if (event.target.id === "modify"){
            navigate("/editflights", {state: {flights: selected}})
        }
        else{
            const data = {purchaser: user.custid, tickets: selected.map(flight => flight.bookingid)}
            const url = "http://localhost:5200/api/flights/deleteflights"
            await axios.post(url, data)
            .then((res) => {
                console.log(res.data)
                let updateFlights = flights;
                for (const deleted of selected){
                    updateFlights = updateFlights.filter((flight) => flight !== deleted)
                }
                setFlights(updateFlights)
                setSelected([])
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    const getFlights = async () => {
        try{
            const data = {purchaser: user.custid}
            const url = "http://localhost:5200/api/flights/bookedflights"
            await axios.post(url, data)
            .then((res) => {
                console.log(res.data)
                setFlights(res.data)

            }).catch((err) => {
                console.log(err)
            })
        }
        catch (err){
            console.log(err)
        }
    }
    useEffect(() => getFlights, [])


return(
    <div className="flights-main-container">
        <h2>Flights for {user.fname}</h2>
        <div className="content">
            {flights.length > 0 ? (
                <>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticket ID</TableCell>
                            <TableCell>Flight ID</TableCell>
                            <TableCell>Origin</TableCell>
                            <TableCell>Destination</TableCell>
                            <TableCell>Departure Time</TableCell>
                            <TableCell>Arrival Time</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell><Checkbox onChange={selectAll}></Checkbox></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {flights.map((flight) => (
                            <TableRow key={flight.bookingid}>
                                <TableCell>{flight.bookingid}</TableCell>
                                <TableCell>{flight.flightid}</TableCell>
                                <TableCell>{flight.origin}</TableCell>
                                <TableCell>{flight.destination}</TableCell>
                                <TableCell>{flight.departuretime.substring(0,16).replace("T", " ")}</TableCell>
                                <TableCell>{flight.arrivaltime.substring(0,16).replace("T", " ")}</TableCell>
                                <TableCell>${flight.price}</TableCell>
                                <TableCell><Checkbox checked={selected.includes(flight)} onChange={() => handleChange(flight)}></Checkbox></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="buttons">
                <Button 
                variant="contained"
                disabled={!selected.length}
                onClick={handleSubmit}
                id="modify"
                style={{
                    borderRadius: 35,
                    backgroundColor: "#21b6ae",
                    padding: "10px 20px",
                    fontSize: "15px",
                    paddingTop: "10px",
                    marginRight: "50px",
                }}
                >Modify Flights</Button>
                <Button 
                variant="contained"
                disabled={!selected.length}
                onClick={handleSubmit}
                id="delete"
                style={{
                    borderRadius: 35,
                    backgroundColor: "#c4000a",
                    padding: "10px 20px",
                    fontSize: "15px",
                    paddingTop: "10px",
                    marginRight: "50px"
                }}
                >Delete Flights</Button></div></>
            ) : <h4>No flights to display!</h4>}
        </div>

    </div>

)

}
export default MyFlights