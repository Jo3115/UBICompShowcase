/**
 * @fileoverview this file contains functions to get the users current location
 */
import * as Location from 'expo-location';

/**
 * GetLocation, function to subscribe to the users location to update location when the user moves
 * @param {object} setCurrentLocation - set useState to hold the location object
 * @param {object} setLoading - set useState to say function is complete
 */
export async function GetLocation(setCurrentLocation, setLoading) {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        return
    }
    return await Location.watchPositionAsync(
        {
            distanceInterval: 1,
            accuracy: Location.Accuracy.High,
        },
        (loc) => {
            let locationStr = JSON.stringify(loc)
            setCurrentLocation(JSON.parse(locationStr))
            setLoading(false)
        }

    )
}

/**
 * GetLocationOnce, function to get the current location once does not update if the user moves
 * @param {object} setCurrentLocation - set useState to hold the location object
 * @param {object} setLoading - set useState to say function is complete
 */
export async function GetLocationOnce(setCurrentLocation, setLoading) {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        return
    }
    let location = await Location.getCurrentPositionAsync({})
    let locationStr = JSON.stringify(location)
    setCurrentLocation(JSON.parse(locationStr))
    setLoading(false)
}