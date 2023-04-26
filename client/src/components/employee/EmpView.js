import { useEffect, useState } from "react";
import axios from "axios";

function EmpView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5200/api/users/empview");
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Employee View</h1>
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
          {data.map((row) => (
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
