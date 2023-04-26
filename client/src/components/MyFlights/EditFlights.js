import React from "react"
import { useLocation } from "react-router-dom"

function EditFlights() {
    const location = useLocation()
    const flights = location.state?.flights
    console.log(flights)

    return(
        <div className="edit-flights-main-container">
            <h2>Edit Flights</h2>
                
        </div>
    )
}

export default EditFlights