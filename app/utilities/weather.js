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
	compassDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
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
    if (windDirection >= subtractDeg(shotDirection, 30) && windDirection <= addDeg(shotDirection, 30)){
        return 1
    }
    if (windDirection >= subtractDeg(shotDirection, 330) && windDirection <= addDeg(shotDirection, 330)){
        return 0.5
    }
    return 0
}

function subtractDeg(x, y){
    let z = x - y
    if (z < 0){
        z = 360-z
    }
    return z
}

function addDeg(x, y){
    let z = x - y
    if (z < 0){
        z = 360-z
    }
    return z
}
