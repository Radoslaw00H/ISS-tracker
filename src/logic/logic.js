// logic.js

const urlAPI = "https://api.wheretheiss.at/v1/satellites/25544";
const refreshInterval = 5000; // Refresh every 5 seconds

async function getISSData() {
    try {
        const response = await fetch(urlAPI);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayISSData(data);

    } catch (error) {
        console.error("Error fetching ISS data:", error);
    }
}

function displayISSData(data) {
        const issDataDiv = document.getElementById("issData");

    const latitude = parseFloat(data.latitude.toFixed(2));
    const longitude = parseFloat(data.longitude.toFixed(2));
    const altitude = parseFloat(data.altitude.toFixed(2));
    const velocity = parseFloat(data.velocity.toFixed(2));

            issDataDiv.innerHTML = `
            <p>Latitude: ${latitude}</p>
            <p>Longitude: ${longitude}</p>
            <p>Altitude: ${altitude} km</p>
            <p>Velocity: ${velocity} km/h</p>
        `;
}

setInterval(getISSData, refreshInterval);
getISSData();