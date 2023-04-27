import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import FlightIcon from '@mui/icons-material/Flight';
import {IconButton, Box} from "@mui/material"
import { formatDateTime, getDuration } from "../../helperFunction/helpers"
import './DepartureFlights.css'
import {Icon} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


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
    const columns =   [{ field: 'flightid', headerName: 'Flight ID' },
    { field: 'departuretime', headerName: 'Departure Time' },
    { field: 'arrivaltime', headerName: 'Arrival Time' },
    { field: 'duration', headerName: 'Duration'},
    { field: 'price', headerName: 'Price' },
     ]
    const departureFlights = allFlights.filter(
        (flight) => flight.origin === origin && flight.destination === destination && flight.departuretime.startsWith(departDate)
    );
    const returnFlights = allFlights.filter(
        (flight) => flight.origin === destination && flight.destination === origin && flight.departuretime.startsWith(returnDate)
    );
    console.log(departureFlights)
    let oneWay = 0;
    if (returnFlights.length === 0) {
        oneWay = 1;
    }
    const [selectedDeparture, setSelectedDeparture] = useState(undefined);
    const navigate = useNavigate();

    return  (
        <div className="departure-main-container">
            <h2>Departure Flights</h2>
            <h4 className="origin-dest-icon">{origin}<Icon sx={{paddingBottom:0.5, marginLeft:0.5, verticalAlign:"middle"}}><ArrowRightAltIcon></ArrowRightAltIcon></Icon> {destination}</h4>
            <div className="content">
                {departureFlights.length > 0 ? <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) =>(
                                    <TableCell key={column.field}>{column.headerName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {departureFlights.map((flight) => (
                        <TableRow sx={{margin:"50px"}} key={flight.flightid}>
                            <TableCell>{flight.flightid}</TableCell>
                            <TableCell>{formatDateTime(flight.departuretime)}</TableCell>
                            <TableCell>{formatDateTime(flight.arrivaltime)}</TableCell>
                            <TableCell>{getDuration(flight.departuretime, flight.arrivaltime)}</TableCell>
                            <TableCell>${flight.price}</TableCell>
                            
                            <Box justifyContent={"center"} textAlign={"center"} ><IconButton onClick={() => {
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
                    }}><FlightIcon></FlightIcon></IconButton></Box>
                        </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </> 
                : <h4>No flights to displays</h4>}
            </div>
        </div>
    )
    // return (
    //     <div>
    //         <h2>Departure Flights</h2>
    //         {departureFlights.map((flight) => (
    //             <div key={flight.flightid}>
    //                 <h3>Flight ID: {flight.flightid}</h3>
    //                 <p>Origin: {flight.origin}</p>
    //                 <p>Destination: {flight.destination}</p>
    //                 <p>Departure Time: {flight.departuretime}</p>
    //                 <p>Arrival Time: {flight.arrivaltime}</p>
    //                 <p>Price: ${flight.price}</p>
    //                 <p>Duration: {flight.duration}</p>
    //                 <button onClick={() => {
    //                     setSelectedDeparture(flight);
    //                     !oneWay &&
    //                         navigate("/return", { 
    //                             state: { 
    //                                 allFlights: allFlights, 
    //                                 origin: origin, 
    //                                 destination: destination, 
    //                                 departDate: departDate, 
    //                                 returnDate: returnDate, 
    //                                 selectedDeparture: flight
    //                             }
    //                         })
    //                     oneWay && (
    //                         navigate("/confirmation", { 
    //                             state: { 
    //                                 allFlights: allFlights, 
    //                                 origin: origin, 
    //                                 destination: destination, 
    //                                 departDate: departDate, 
    //                                 returnDate: returnDate, 
    //                                 selectedDeparture: flight, 
    //                                 newDate: newDate,
    //                                 bookingID: bookingID,
    //                                 editedflights: editedflights
    //                             }
    //                         })
    //                     )
    //                 }}
    //                 >Select
    //                 </button>
    //             </div>
    //         ))}
    //         <div>
    //             <h3>Total Flights: {departureFlights.length}</h3>
                
    //             { !oneWay && 
    //                 (<div>
    //                 <button onClick={() => navigate("/return", 
    //                     { state: { 
    //                         allFlights: allFlights, 
    //                         origin: origin, 
    //                         destination: destination, 
    //                         departDate: departDate, 
    //                         returnDate: returnDate, 
    //                         selectedDeparture: selectedDeparture 
    //                         }
    //                     }
    //                 )}
    //                 >
    //                     Next
    //                 </button>
    //                 </div>)
    //             }
    //         </div>
    //     </div>
    // );
}

export default DeptFlights;