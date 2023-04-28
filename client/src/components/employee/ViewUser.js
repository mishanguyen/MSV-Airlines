import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useLocation } from "react-router-dom";
import { formatDateTime, getDuration } from "../../helperFunction/helpers"
import axios from "axios";

function ViewUser() {
    const location = useLocation()
    const customer = location.state?.user
    const [custFlights, setcustFlights] = useState([])
    console.log(customer)
    const columns =   [{ field: 'flightid', headerName: 'Flight ID' },
    { field: 'departuretime', headerName: 'Departure Time' },
    { field: 'arrivaltime', headerName: 'Arrival Time' },
    { field: 'duration', headerName: 'Duration'},
    { field: 'price', headerName: 'Price' },
     ]

    const getUserFlights = async () =>{
        const custid = customer.custid
        await axios.get(`http://localhost:5200/api/flights/employeeview/${custid}`)
        .then((res) =>{
            console.log(res.data)
            setcustFlights(res.data)
        }).catch ((err) => {
            console.log(err)
        })
    }

    useEffect(() => getUserFlights, [])

    return(
        <div style={{textAlign:"center"}}className="view-user-main-container">
            <h2>Displaying flights for - (ID: {customer.custid}) {customer.fname} {customer.lname}</h2>
            <div className="content">
                {custFlights.length > 0 ? <>
                <Table>
                    <TableHead>
                        <TableRow>
                                {columns.map((column) =>(
                                    <TableCell key={column.field}>{column.headerName}</TableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                <TableBody>
                {custFlights.map((flight) => (
                        <TableRow sx={{margin:"50px"}} key={flight.flightid}>
                            <TableCell>{flight.flightid}</TableCell>
                            <TableCell>{formatDateTime(flight.departuretime)}</TableCell>
                            <TableCell>{formatDateTime(flight.arrivaltime)}</TableCell>
                            <TableCell>{getDuration(flight.departuretime, flight.arrivaltime)}</TableCell>
                            <TableCell>${flight.price}</TableCell>
                        </TableRow>
                ))}
                </TableBody>
                </Table>
                </>
                : <h3>No data to display</h3>}

            </div>
        </div>
    )
}

export default ViewUser