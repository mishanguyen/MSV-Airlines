import { useEffect, useState } from "react";
import axios from "axios";
import "./EmpView.css";
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { IconButton, Button, Radio, TextField, Alert } from "@mui/material";
import PageviewIcon from '@mui/icons-material/Pageview';
import { useNavigate } from "react-router-dom";
import {Autocomplete} from "@mui/material";

function EmpView() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [custId, setCustId] = useState('');
    const [searchValue, setSearchValue] = useState(undefined)
    const [options, setOptions] = useState([])
    const navigate = useNavigate()
    const [err, setErr] = useState(undefined)

    useEffect(() => {
        const fetchData = async () => {
        const result = await axios.get("http://localhost:5200/api/users/empview");
        setData(result.data);
        setFilteredData(result.data);
        console.log(result.data)
        const uniqueOptions = [...new Set(result.data.map(item => item.custid))];
        setOptions(uniqueOptions)
        };
        fetchData();
    }, []);

    const handleClick = (user) => {
        console.log(user)
        navigate("/viewuser", {state: {user: user}})
    }
    const handleSearchChange = (event, newValue) => {
        console.log(event)
        const value = newValue ? newValue : null;
        console.log(value)
        setSearchValue(value);
    };

    const filterData = () => {
        console.log(searchValue)
        if (searchValue){
            const newData = data.filter((user) => user == searchValue)
            setData(newData)
        } else{
            setErr("Please enter a value.")
        }
    }
    return (
        <div className="empview-main-div">
            <h1>Search Bookings</h1>
            <Autocomplete
                    sx={{padding:"15px"}}
                    required
                    clearOnBlur={false}
                    id="filter"
                    options={data}
                    getOptionLabel={(option) => `${option.custid} - ${option.fname} ${option.lname}`}
                    value={searchValue}
                    onChange={handleSearchChange}
                    renderInput={(params) => (
                        <TextField required {...params} label="Search" value={searchValue} 
                        variant="outlined" />
                    )}
                />
                <div className="buttonContainer">
                <Button variant="contained" onClick={filterData}>Search</Button>
                {err && <Alert sx={{textAlign:"center"}}severity="error">{err}</Alert>}
                </div>
            <div className="content">
                {filteredData.length > 0 ? <> 
                    <Table size="small">
                        <TableHead style={{justifyContent:"center"}}>
                            <TableRow>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell sx={{textAlign:"center"}}>View User</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((user) => (
                                <TableRow key={user.custid}>
                                    <TableCell>{user.custid}</TableCell>
                                    <TableCell>{user.fname}</TableCell>
                                    <TableCell>{user.lname}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell sx={{textAlign:"center"}}><Radio onClick={() => handleClick(user)}></Radio></TableCell>
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
