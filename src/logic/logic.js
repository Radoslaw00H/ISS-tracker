// logic.js

const urlAPI = "https://api.wheretheiss.at/v1/satellites/25544";
const refreshInterval = 5000; // Refresh every 5 seconds
let issHistory = [];

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

    const data = await response.json();
    issHistory.push({
        latitude: data.latitude,
        longitude: data.longitude,
        altitude: data.altitude,
        velocity: data.velocity,
        timestamp: data.timestamp
    });

    if (issHistory.length > 100) {
        issHistory.shift();
    }
}

function displayISSData(data) {
    const issDataDiv = document.getElementById("issData");

        const latitude = parseFloat(data.latitude.toFixed(7));
        const longitude = parseFloat(data.longitude.toFixed(7));
        const altitude = parseFloat(data.altitude.toFixed(3));
        const velocity = parseFloat(data.velocity.toFixed(0));

            issDataDiv.innerHTML = `
            <p>Latitude: ${latitude}</p>
            <p>Longitude: ${longitude}</p>
            <p>Altitude: ${altitude} km</p>
            <p>Velocity: ${velocity} km/h</p>
            <p>Last Updated: ${new Date().toLocaleTimeString()}</p>
        `;
}

function displayISSHistory() {
    const issDataDiv = document.getElementById("issData");
    issDataDiv.innerHTML = "<h3>ISS Position History (Last 100 entries)</h3>";
    issHistory.forEach((entry, index) => {
        const latitude = parseFloat(entry.latitude.toFixed(7));
        const longitude = parseFloat(entry.longitude.toFixed(7));
        const altitude = parseFloat(entry.altitude.toFixed(3));
        const velocity = parseFloat(entry.velocity.toFixed(0));
        const timestamp = new Date(entry.timestamp * 1000).toLocaleTimeString();
        issDataDiv.innerHTML += `
            <p>${index + 1}. Latitude: ${latitude}, Longitude: ${longitude}, Altitude: ${altitude} km, Velocity: ${velocity} km/h, Timestamp: ${timestamp}</p>
        `;
    });
}


setInterval(getISSData, refreshInterval);
getISSData();