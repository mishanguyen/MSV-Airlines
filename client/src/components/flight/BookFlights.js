import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookFlights.css';
import ToggleSwitch from './ToggleSwitch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Button from '@mui/material/Button';

function Flights() {
    const [noFlights, setNoFlights] = React.useState(false);
    const [err, setErr] = React.useState(false);
    const [origin, setOrigin] = useState(null);
    const [minDate, setMinDate] = useState('');
    const [destination, setDestination] = useState(null);
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [departDate, setDepartDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
    }, []);
  
    useEffect(() => {
        async function fetchOrigins() {
            const response = await axios.get('http://localhost:5200/api/flights/origins');
            setOrigins(response.data);
        }
        fetchOrigins();
    }, []);

    useEffect(() => {
        async function fetchDestinations() {
            const response = await axios.get('http://localhost:5200/api/flights/destinations');
            setDestinations(response.data);
        }
        fetchDestinations();
    }, []);
      
    const handleOriginChange = (event, newValue) => {
        const newOrigin = newValue ? newValue : null;
        if (newOrigin === null){
            setErr(true)
        } else {
            setErr(false)
        }
        setOrigin(newOrigin);
    };

    const handleDestinationChange = (event, newValue) => {
        const newDestination = newValue ? newValue : null;
        if (newDestination === null){
            setErr(true)
        } else {
            setErr(false)
        }
        setDestination(newDestination);
    };

    const handleRoundTripChange = () => {
        setIsRoundTrip(!isRoundTrip);
    };

    const handleDepartDateChange = (date) => {
        const formattedDate = date ? date.format('YYYY-MM-DD') : '';
        if (formattedDate === ''){
            setErr(true)
        } else {
            setErr(false)
        }
        setDepartDate(formattedDate);
    };

    const handleReturnDateChange = (date) => {
        const formattedDate = date ? date.format('YYYY-MM-DD') : '';
        if (formattedDate === ''){
            setErr(true)
        } else {
            setErr(false)
        }
        setReturnDate(formattedDate);
      };
    
    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const originCode = origin.code;
            const destinationCode = destination.code;
            let url = `http://localhost:5200/api/flights/flights?origin=${originCode}&destination=${destinationCode}&departureDate=${departDate}`;
            const response = await axios.get(url);
            const departureFlights = response.data.rows;
            if (departureFlights.length === 0) {
                setNoFlights(true);
                return;
            }
            let returnFlights = []
            if (isRoundTrip) {
                // Fetch return flights
                const returnUrl = `http://localhost:5200/api/flights/flights?origin=${destinationCode}&destination=${originCode}&departureDate=${returnDate}`;
                const returnResponse = await axios.get(returnUrl);
                returnFlights = returnResponse.data.rows;
            }
            const allFlights = [...departureFlights, ...returnFlights];
            setFlights(allFlights);
            navigate('/departure', { state: {allFlights: allFlights, origin: originCode, destination: destinationCode, departDate: departDate, returnDate: returnDate } });
        } catch (err) {
            setErr(true);
            console.error(err);
        }
    };

    return (
        <div className="searchPage">
            <h1>Book Your Trip</h1>
            <div className="searchPageContainer">
                <ToggleSwitch checked={!isRoundTrip} onChange={handleRoundTripChange} />
                <div className='formContainer'>
                    <div className='routeContainer'>
                        <div className='userInput' >
                            <label htmlFor="origin" className='label'>Origin:</label>
                            <Autocomplete
                                id="origin"
                                options={origins}
                                getOptionLabel={(option) => `${option.code} - ${option.name}`}
                                value={origin}
                                onChange={handleOriginChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select origin" variant="outlined" required />
                                )}
                            />
                            
                        </div>
                        <div className='swapContainer'>
                            <SwapHorizIcon
                                onClick={() => {
                                    const temp = origin;
                                    setOrigin(destination);
                                    setDestination(temp);
                                }}
                            />
                        </div>
                        <div className='userInput'>
                            <label htmlFor="destination" className='label'>Destination:</label>
                            <Autocomplete
                                id="destination"
                                options={destinations}
                                getOptionLabel={(option) => `${option.code} - ${option.name}`}
                                value={destination}
                                onChange={handleDestinationChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select destination" variant="outlined" required />
                                )}
                            />
                        </div>
                    </div>

                    <div className='dateContainer'>
                        <div className='userInput'>
                            <label htmlFor="depart-date" className='label'>Depart date:</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    disablePast
                                    id="depart-date"
                                    min={minDate}
                                    label="Departure Date"
                                    value={departDate}
                                    onChange={handleDepartDateChange}
                                    required
                                />
                            </LocalizationProvider>
                        </div>
                        {isRoundTrip && (
                            <div className='userInput'>
                                <label htmlFor="return-date" className='label'>Return date:</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        disablePast
                                        id="return-date"
                                        min={minDate}
                                        label="Return Date"
                                        value={returnDate}
                                        onChange={handleReturnDateChange}
                                        required
                                    />
                                </LocalizationProvider>
                            </div>
                        )}
                    </div>
                    
                    <div className='buttonContainer'>
                        <Button variant="contained" onClick={handleSearch}>Search</Button>
                    </div>

                    {err && <Alert variant="outlined" severity="error">
                        Please enter the required fields!
                    </Alert>}

                    {noFlights && <Alert variant="outlined" severity="error">
                        Sorry, there are no flights for the chosen route or date!
                    </Alert>}
                </div>
               
            </div>
        </div>
    );
}

export default Flights;