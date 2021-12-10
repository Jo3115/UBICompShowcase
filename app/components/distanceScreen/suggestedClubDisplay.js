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
import { CalculateClosestClub, CalculateClubBounds } from '../../utilities/suggestedClub';
import { GetUserDistances } from '../../utilities/firebase';
import LoadingIndicator from '../general/loadingIndicator';


/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const SuggestedClubDisplay = ({ target, currentLocation, targetLocation, metric }) => {
    const [isLoadingWeather, setLoadingWeather] = useState(true)
    const [weatherData, setWeatherData] = useState({})
    const [isLoadingClubs, setLoadingClubs] = useState(true)
    const [clubData, setClubData] = useState({})

    // calculate distance for current point to target point
    let startLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    let targetLatLong = { latitude: targetLocation[target].lat, longitude: targetLocation[target].lon }
    let baseDistance = CalculateDistance(startLatLon, targetLatLong, "m")
    // calculate the height change 
    let heightChange = currentLocation.coords.altitude - targetLocation[target].elv

    // calculate wind speed and if into wind
    useEffect(() => {
        GetWeather(targetLocation[target].lat, targetLocation[target].lon, setWeatherData, setLoadingWeather);
    }, []);

    // get club information when weather is loaded
    useEffect(() => {
        GetUserDistances("default", setClubData, setLoadingClubs)
    }, [isLoadingWeather]);

    let windDirectionRenderSwitch = (windDirection) => {
        switch (windDirection) {
            case '1':
                return 'HEADWIND'
            case '0.5':
                return 'DOWNWIND'
            default:
                return 'SIDEWIND'
        }
    }

    if (!isLoadingWeather) {
        // need to add 1% for each mph of head wind
        // need to remove 0.5% for each mph of head wind
        let windDirection = CalculateDirection(startLatLon, targetLatLong)
        let windDirectionModifier = CalculateIntoWind(windDirection, weatherData.wind)
        let calculatedDistance = baseDistance * (1 + ((windDirectionModifier * weatherData.wind.speed) / 100))
        if (!isLoadingClubs) {
            let clubToUse = (CalculateClosestClub(clubData, calculatedDistance))
            return (
                <View style={styles.container}>
                    <Text style={styles.titleText}>Suggested Club</Text>
                    <Text style={styles.suggestedClubText}>{clubData[clubToUse]}</Text>
                    <View style={styles.conditionsRow}>
                        <Text style={styles.infoText}>
                            {windDirectionRenderSwitch(windDirection)}: {weatherData.wind.speed}m/s
                        </Text>
                    </View>
                </View>
            );
        }
    }
    return (<LoadingIndicator headding={"Deciding on Club"} />)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: "center",
    },
    conditionsRow: {
        width: "100%",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "center",
    },
    titleText: {
        fontSize : 30,
    },
    suggestedClubText: {
        fontSize:60
    },
    infoText: {
        fontSize: 20
    }
})

export default SuggestedClubDisplay;