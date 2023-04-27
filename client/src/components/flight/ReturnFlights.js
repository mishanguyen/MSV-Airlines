import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import FlightIcon from '@mui/icons-material/Flight';
import {IconButton, Box} from "@mui/material"
import { formatDateTime, getDuration } from "../../helperFunction/helpers"
import "./ReturnFlights.css"
import {Icon} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function RetFlights() {
    const location = useLocation();
    const allFlights = location.state?.allFlights;
    const origin = location.state?.origin;
    const destination = location.state?.destination;
    const departDate = location.state?.departDate;
    const returnDate = location.state?.returnDate;
    const selectedDeparture = location.state?.selectedDeparture;
    const [selectedReturn, setSelectedReturn] = useState('');
    const columns =   [{ field: 'flightid', headerName: 'Flight ID' },
    { field: 'departuretime', headerName: 'Departure Time' },
    { field: 'arrivaltime', headerName: 'Arrival Time' },
    { field: 'duration', headerName: 'Duration'},
    { field: 'price', headerName: 'Price' },
     ]
    const returnFlights = allFlights.filter(
        (flight) => flight.origin === destination && flight.destination === origin && flight.departuretime.startsWith(returnDate)
    );
    const navigate = useNavigate();

    return  (
      <div className="return-main-container">
          <h2>Return Flights</h2>
          <h4 className="origin-dest-icon">{origin}
          <Icon sx={{paddingBottom:0.5, marginLeft:0.5, verticalAlign:"middle"}}>
            <ArrowRightAltIcon></ArrowRightAltIcon>
            </Icon>{destination}</h4>
          <div className="content">
              {returnFlights.length > 0 ? <>
                  <Table size="small">
                      <TableHead>
                          <TableRow>
                              {columns.map((column) =>(
                                  <TableCell key={column.field}>{column.headerName}</TableCell>
                              ))}
                          </TableRow>
                      </TableHead>
                      <TableBody>
                      {returnFlights.map((flight) => (
                      <TableRow sx={{margin:"50px"}} key={flight.flightid}>
                          <TableCell>{flight.flightid}</TableCell>
                          <TableCell>{formatDateTime(flight.departuretime)}</TableCell>
                          <TableCell>{formatDateTime(flight.arrivaltime)}</TableCell>
                          <TableCell>{getDuration(flight.departuretime, flight.arrivaltime)}</TableCell>
                          <TableCell>${flight.price}</TableCell>
                          
                          <Box justifyContent={"center"} textAlign={"center"} >
                            <IconButton onClick={() => {
                              setSelectedReturn(flight);
                              navigate("/confirmation", { 
                              state: { 
                              allFlights: allFlights, 
                              origin: origin, 
                              destination: destination, 
                              departDate: departDate, 
                              returnDate: returnDate, 
                              selectedDeparture: selectedDeparture, 
                              selectedReturn: flight
                            }
                    })
            }}
                          ><FlightIcon></FlightIcon></IconButton></Box>
                      </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </> 
              : <h4>No flights to displays</h4>}
          </div>
      </div>
  )
  }

export default RetFlights;