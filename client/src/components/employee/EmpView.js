import { useEffect, useState } from "react";
import axios from "axios";
import "./EmpView.css";

function EmpView() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [custId, setCustId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        const result = await axios.get("http://localhost:5200/api/users/empview");
        setData(result.data);
        setFilteredData(result.data);
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
        <div>
        <h1>Employee View</h1>
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
        <table>
            <thead>
            <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Booking ID</th>
                <th>Price</th>
                <th>Purchaser</th>
                <th>Flight ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
            </tr>
            </thead>
            <tbody>
            {filteredData.map((row) => (
                <tr key={row.bookingid}>
                <td>{row.custid}</td>
                <td>{row.fname}</td>
                <td>{row.lname}</td>
                <td>{row.address}</td>
                <td>{row.bookingid}</td>
                <td>{row.price}</td>
                <td>{row.purchaser}</td>
                <td>{row.flightid}</td>
                <td>{row.origin}</td>
                <td>{row.destination}</td>
                <td>{row.departuretime}</td>
                <td>{row.arrivaltime}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
  );
}

export default EmpView;
