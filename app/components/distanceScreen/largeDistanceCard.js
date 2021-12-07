/**
 * @fileoverview this file represents a HoleSelect component, renders a component displaying current hole and allowing the user to navigate to a given hole.
 */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import { CalculateDistance } from '../../utilities/distance';

/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const LargeDistanceCard = ({ target, currentLocation, targetLocation, metric }) => {
    if (currentLocation === null || targetLocation === null) {
        return (
            <View style={styles.distanceBox}>
                <Text>waiting make this look better later</Text>
            </View>
        )
    }
    let startLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    let targetLatLong = { latitude: targetLocation[target].lat, longitude: targetLocation[target].lon }
    let distance = (CalculateDistance(startLatLon, targetLatLong, currentLocation.coords.altitude, targetLocation[target].elv))
    if (metric == "ft") {
        distance = distance * 3.28084
    }
    distance = Math.round(distance)
    return (
        <View style={styles.distanceBox}>
            <View style={styles.textRow}>
                <Text style={styles.distanceText}>{distance}</Text>
                <Text style={styles.metricText}>{metric}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    distanceBox: {
        width: "100%",
        height: 300,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "yellow"
    },
    distanceText: {
        fontSize: 100
    },
    metricText: {
        fontSize: 50,
        alignItems: "flex-end"
    },
    textRow:{
        flexDirection: 'row',
        alignItems: "flex-end"
    }
})

export default LargeDistanceCard;