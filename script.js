// Heatwave Monitoring Interactive Script

document.addEventListener("DOMContentLoaded", function () {
    // Display current timestamp
    updateTimestamp();

    // Auto-update time every minute
    setInterval(updateTimestamp, 60000);
});

function updateTimestamp() {
    const timeElem = document.getElementById("live-time");
    if (timeElem) {
        const now = new Date();
        timeElem.textContent = "Last updated: " + now.toLocaleDateString() + " " + now.toLocaleTimeString();
    }
}

// Calculate Heat Index using Rothfusz regression formula approximation
function calculateHeatIndex() {
    const tempCelsius = parseFloat(document.getElementById("temp-input").value);
    const humidity = parseFloat(document.getElementById("rh-input").value);

    if (isNaN(tempCelsius) || isNaN(humidity)) {
        alert("Please enter valid numeric values for temperature and humidity.");
        return;
    }

    // Convert Celsius to Fahrenheit for Rothfusz formula
    const T = (tempCelsius * 9 / 5) + 32;
    const R = humidity;

    // Simple Heat Index formula
    let HI_F = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (R * 0.094));

    if (HI_F >= 80) {
        HI_F = -42.379 + 2.04901523 * T + 10.14333127 * R - 0.22475541 * T * R
            - 0.00683783 * T * T - 0.05481717 * R * R + 0.00122874 * T * T * R
            + 0.00085282 * T * R * R - 0.00000199 * T * T * R * R;
    }

    // Convert back to Celsius
    const HI_C = ((HI_F - 32) * 5 / 9).toFixed(1);

    const resultBox = document.getElementById("calc-result");
    const resHI = document.getElementById("res-hi");
    const resDesc = document.getElementById("res-desc");

    resultBox.classList.remove("hidden");
    resHI.textContent = HI_C;

    if (HI_C < 30) {
        resDesc.textContent = "Status: Comfortable / Normal. Low risk of heat-related illness.";
        resultBox.style.borderColor = "#2e7d32";
        resHI.style.color = "#2e7d32";
    } else if (HI_C >= 30 && HI_C < 38) {
        resDesc.textContent = "Status: Caution. Fatigue possible with prolonged exposure and activity.";
        resultBox.style.borderColor = "#f57f17";
        resHI.style.color = "#f57f17";
    } else if (HI_C >= 38 && HI_C < 45) {
        resDesc.textContent = "Status: Extreme Caution / Heat Advisory. Heat cramps and heat exhaustion possible.";
        resultBox.style.borderColor = "#ed6c02";
        resHI.style.color = "#ed6c02";
    } else {
        resDesc.textContent = "Status: DANGER! Heat stroke highly likely with continued exposure. Avoid outdoor activity!";
        resultBox.style.borderColor = "#d32f2f";
        resHI.style.color = "#d32f2f";
    }
}
