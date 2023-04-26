import React, { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Button, Checkbox } from "@mui/material"
function MyFlights( {loggeduser} ) {
    const user = JSON.parse(localStorage.getItem('user'))
    const [flights, setFlights] = useState([])
    const [selected, setSelected] = useState([])

    const handleChange = (flight) => {
        console.log(flight)
        if (selected.includes(flight)){
            setSelected(selected.filter((selected) => selected != flight))
        }
        else{
            setSelected([...selected, flight])
        }
    }
    const handleSubmit = async () =>{
        console.log(selected)
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
                            <TableCell>Select<Checkbox ></Checkbox></TableCell>
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
                <Button 
                variant="contained"
                disabled={!selected.length}
                onClick={handleSubmit}
                fullWidth>Submit</Button></>
            ) : <h4>No flights to display!</h4>}
        </div>

    </div>

)

}
export default MyFlights