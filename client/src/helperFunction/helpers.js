import React from "react";

export function formatDateTime(dateTime){
    const options = { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(new Date(dateTime)).replace(",", "");
}

export function getDuration(startDateTime, endDateTime){
    // Convert formatted date strings to Date objects
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    // Calculate duration in milliseconds
    const duration = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    // Format duration as string
    const durationString = `${hours}h ${minutes}m`;
    return durationString;
}