const axios = require('axios');

// Function to get coordinates from address using OpenStreetMap's Nominatim API
async function getCoordinatesFromAddress(address) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
//     address = "Charminar, Hyderabad"
// url → https://nominatim.openstreetmap.org/search?format=json&q=Charminar%2C%20Hyderabad

    const response = await axios.get(url);

    if (response.data.length > 0) {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      return { lat, lon };
    } else {
      throw new Error("No results found for the provided address");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
}

module.exports = { getCoordinatesFromAddress };
