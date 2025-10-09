// utils/distance.js
const axios = require("axios");

const getDrivingDistance = async (startCoords, endCoords) => {
  if(
    !startCoords || !endCoords ||
    !startCoords.lat || !startCoords.lon ||
    !endCoords.lat || !endCoords.lon
  ) {
    throw new Error("Invalid coordinates provided");
  }

  const url = `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=false`;
  //  Open Source Routing Machine (OSRM) is a high-performance routing engine for shortest paths in road networks.
  const res = await axios.get(url);

  if (!res.data || !res.data.routes || res.data.routes.length === 0) {
    throw new Error("No routes found in OSRM response");
  }

  const distanceInKm = res.data.routes[0].distance / 1000; // distance in km
//   res.data.routes[0] → Takes the first route returned by OSRM.
// .distance → The distance of the route in meters.
// / 1000 → Converts meters to kilometers.
// So now distanceInKm is the driving distance in kilometers.
  return distanceInKm;
};

module.exports = getDrivingDistance;
