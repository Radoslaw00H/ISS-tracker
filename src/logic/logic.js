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

/*historyTrack() {
    dataHistory = JSON.parse(localStorage.getItem("issHistory")) || [];
    const currentPosition = {
        latitude: parseFloat(data.latitude.toFixed(7)),
        longitude: parseFloat(data.longitude.toFixed(7)),
        timestamp: new Date().toLocaleTimeString()
    };
    dataHistory.push(currentPosition);
    localStorage.setItem("issHistory", JSON.stringify(dataHistory));
    return dataHistory.length;
}*/

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

setInterval(getISSData, refreshInterval);
getISSData();