/**
 * @fileoverview this file contains functions used to handle weather data
 */

/**
 * GetWeather, function gets weather for given location from open weathermaps
 * @param {lat} lat - the latitude of current location
 * @param {lat} lon - the longitude of current location
 * @param {object} setData - set useState to hold the got weather data
 * @param {object} setLoading - set useState to say function is complete
 */
export async function GetWeather(lat, lon, setData, setLoading) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=70da210361f03f4c124c193030595c93&units=metric`
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}

/**
 * DegToCompass, function converts a degrees to a compass direction
 * @param {string} inDeg - the degrees to convert
 * @returns {string} - compass Direction string
 */
export function DegToCompass(inDeg) {
    // 360/16 = 22.5
    // add 0.5 to make into index
    let index = Math.floor((inDeg / 22.5) + 0.5)
    compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    return compassDirections[index]
}

/**
 * DegToCompass, function converts a degrees to a compass direction
 * @param {string} inDeg - the degrees to convert
 * @returns {string} - compass Direction string
 */
export function CalculateIntoWind(shotDirection, windDirection) {
    // if within 30 degrees either way into wind
    // equates to within 330 either way for with wind
    if (windDirection >= subtractDeg(shotDirection, 30) && windDirection <= addDeg(shotDirection, 30)) {
        return 1
    }
    if (windDirection >= subtractDeg(shotDirection, 330) && windDirection <= addDeg(shotDirection, 330)) {
        return 0.5
    }
    return 0
}

/**
 * subtractDeg, function subtracts a degrees making sure it does not overflow past 360
 * @param {number} x - the starting number
 * @param {number} y - the number to subtract
 * @returns {string} - new degreese 
 */
function subtractDeg(x, y) {
    let z = x - y
    if (z < 0) {
        z = 360 + z
    }
    return z
}

/**
 * addDeg, function adds a degrees making sure it does not overflow past 360
 * @param {number} x - the starting number
 * @param {number} y - the number to add
 * @returns {string} - new degreese 
 */
function addDeg(x, y) {
    let z = x + y
    if (z > 360) {
        z = z - 360
    }
    return z
}
