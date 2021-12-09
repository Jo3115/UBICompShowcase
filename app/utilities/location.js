import * as Location from 'expo-location';

export async function GetLocation(setCurrentLocation, setLoading) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return;
    }
    let location = await Location.watchPositionAsync(
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