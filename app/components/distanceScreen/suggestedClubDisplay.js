/**
 * @fileoverview this file represents a SuggestedClubDisplay component, renders a component displaying sugested club along with infomation used to make that calculation
 */
import React, { useEffect, useState }  from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CalculateDirection, CalculateDistance } from '../../utilities/distance';
import { CalculateIntoWind, GetWeather } from '../../utilities/weather';
import { CalculateClosestClub, GetUserDistances } from '../../utilities/suggestedClub';
import LoadingIndicator from '../general/loadingIndicator';


/**
 * SuggestedClubDisplay, renders a component displaying sugested club along with infomation used to make that calculation
 * @param {string} target - type of icon to display
 * @param {object} currentLocation - current location object
 * @param {object} targetLocation - target location object
 */
const SuggestedClubDisplay = ({ target, currentLocation, targetLocation }) => {
    const [isLoadingWeather, setLoadingWeather] = useState(true)
    const [weatherData, setWeatherData] = useState({})
    const [isLoadingClubs, setLoadingClubs] = useState(true)
    const [clubData, setClubData] = useState({})

    // calculate distance for current point to target point
    let startLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    let targetLatLong = { latitude: targetLocation[target].lat, longitude: targetLocation[target].lon }
    let baseDistance = CalculateDistance(startLatLon, targetLatLong, 'm')
    // calculate the height change 
    let heightChange = Math.round(currentLocation.coords.altitude - targetLocation[target].elv)

    // calculate wind speed and if into wind
    useEffect(() => {
        GetWeather(targetLocation[target].lat, targetLocation[target].lon, setWeatherData, setLoadingWeather);
    }, []);

    // get club information when weather is loaded
    useEffect(() => {
        GetUserDistances(setClubData, setLoadingClubs)
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
                    {/**
                    <Text style={styles.infoText}>
                        Height Change: {heightChange}m
                    </Text>
                    */}
                </View>
            );
        }
    }
    return (<LoadingIndicator headding={'Deciding on Club'} />)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 35
    },
    conditionsRow: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
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