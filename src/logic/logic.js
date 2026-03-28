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
            issDataDiv.innerHTML = `
            <p>Latitude: ${data.latitude}</p>
            <p>Longitude: ${data.longitude}</p>
            <p>Altitude: ${data.altitude} km</p>
            <p>Velocity: ${data.velocity} km/h</p>
        `;
}