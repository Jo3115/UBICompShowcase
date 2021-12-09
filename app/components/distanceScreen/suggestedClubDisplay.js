/**
 * @fileoverview this file represents a HoleSelect component, renders a component displaying current hole and allowing the user to navigate to a given hole.
 */
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react/cjs/react.development';
import { CalculateDirection, CalculateDistance } from '../../utilities/distance';
import { CalculateIntoWind, DegToCompass, GetWeather } from '../../utilities/weather';
import { get } from '@firebase/database';
import { CalculateClubBounds } from '../../utilities/suggestedClub';


/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const SuggestedClubDisplay = ({ target, currentLocation, targetLocation, metric }) => {
    const [isLoadingWeather, setLoadingWeather] = useState(true);
    const [weatherData, setWeatherData] = useState({});

    // calculate distance for current point to target point
    let startLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    let targetLatLong = { latitude: targetLocation[target].lat, longitude: targetLocation[target].lon }
    let baseDistance = CalculateDistance(startLatLon, targetLatLong, metric)
    // calculate the height change 
    let heightChange = currentLocation.coords.altitude - targetLocation[target].elv
    console.log(heightChange)

    // calculate wind speed and if into wind
    // need to add 1% for each mph of head wind
    // need to remove 0.5% for each mph of head wind
    useEffect(() => {
        GetWeather(targetLocation[target].lat, targetLocation[target].lon, setWeatherData, setLoadingWeather);
    }, []);
    console.log(weatherData.wind)
    console.log(CalculateDirection(startLatLon, targetLatLong))
    if (!isLoadingWeather){
        let windDirectionModifier = CalculateIntoWind(CalculateDirection(startLatLon, targetLatLong), weatherData.wind)
        let calculatedDistance = baseDistance * (1 + ((windDirectionModifier * weatherData.wind.speed)/100))
        console.log(calculatedDistance)
        console.log(CalculateClubBounds("default"))
    }

    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
})

export default SuggestedClubDisplay;