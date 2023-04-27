import { useEffect, useState } from "react";
import axios from "axios";
import "./EmpView.css";
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

function EmpView() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [custId, setCustId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        const result = await axios.get("http://localhost:5200/api/users/empview");
        setData(result.data);
        setFilteredData(result.data);
        console.log(result.data)
        };
        fetchData();
    }, []);

    const filterData = async () => {
        try {
        const result = await axios.get(`http://localhost:5200/api/users/empview/${custId}`);
        setFilteredData(result.data);
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div className="empview-main-div">
            <h1>Search Bookings</h1>
            <div className="filter-box">
                <label htmlFor="cust-id">Customer ID:</label>
                <input
                type="text"
                id="cust-id"
                name="cust-id"
                value={custId}
                onChange={(e) => setCustId(e.target.value)}
                />
                <button onClick={filterData}>Filter</button>
            </div>
            <div className="content">
                {filteredData.length > 0 ? <> 
                    <Table size="small">
                        <TableHead style={{justifyContent:"center"}}>
                            <TableRow>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Booking ID</TableCell>
                                <TableCell>Origin</TableCell>
                                <TableCell>Destination</TableCell>
                                <TableCell>Departure Time</TableCell>
                                <TableCell>Arrival Time</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((user) => (
                                <TableRow key={user.bookingid}>
                                    <TableCell>{user.custid}</TableCell>
                                    <TableCell>{user.fname} {user.lname}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.bookingid}</TableCell>
                                    <TableCell>{user.origin}</TableCell>
                                    <TableCell>{user.destination}</TableCell>
                                    <TableCell>{user.departuretime.replace("T", " ").substring(0, 16)}</TableCell>
                                    <TableCell>{user.arrivaltime.replace("T", " ").substring(0, 16)}</TableCell>
                                    <TableCell>${user.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </> :
                <h2>No records found.</h2>}
            </div>
        </div>
  );
}

export default EmpView;
