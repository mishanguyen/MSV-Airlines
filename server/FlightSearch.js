// async function searchFlights(origin, destination) {
//   const fetch = await import('node-fetch');
//   const response = await fetch.default(`http://localhost:5200/flights?origin=${origin}&destination=${destination}`);
//   const flights = await response.json();
//   return flights;
// }

// module.exports = { searchFlights };


async function searchFlights(origin, destination) {
  try {
    const fetch = require('node-fetch');
    const response = await fetch(`http://localhost:5400/flights?origin=${origin}&destination=${destination}`);
    const flights = await response.json();
    console.log('flights:', flights);
    return flights;
  } catch (error) {
    console.log('Error searching for flights:', error);
    return [];
  }
}

module.exports = { searchFlights };
