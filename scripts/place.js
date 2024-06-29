function calculateWindChill(temperatureCelsius, windSpeedKmPerHour) {
    if (temperatureCelsius > 10 || windSpeedKmPerHour <= 4.8) {
        return "N/A";
    }

    const windChill = 13.12 + (0.6215 * temperatureCelsius)
        - (11.37 * Math.pow(windSpeedKmPerHour, 0.16))
        + (0.3965 * temperatureCelsius * Math.pow(windSpeedKmPerHour, 0.16));
    return windChill.toFixed(2) + "°C";
}

const temperatureCelsius = 5;
const windSpeedKmPerHour = 20;
const windChill = calculateWindChill(temperatureCelsius, windSpeedKmPerHour);

document.getElementById('wind-chill').innerHTML = windChill;
document.getElementById('temperature').innerHTML = temperatureCelsius + "°C";
document.getElementById('wind-speed').innerHTML = windSpeedKmPerHour + " km/h";