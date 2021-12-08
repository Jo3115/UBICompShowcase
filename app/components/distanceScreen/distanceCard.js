/**
 * @fileoverview this file represents a HoleSelect component, renders a component displaying current hole and allowing the user to navigate to a given hole.
 */
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import { CalculateDistance } from '../../utilities/distance';
import DistanceIcon from './distanceIcon';

/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const DistanceCard = ({ target, currentLocation, targetLocation, metric, type }) => {
    if (currentLocation === null || targetLocation === null) {
        return (
            <View style={styles.distanceBox}>
                <Text>waiting make this look better later</Text>
            </View>
        )
    }
    let height = 100
    if (type == "large") {
        height = 200
    }
    let backgroundColor = "yellow"
    if (target == "front") {
        backgroundColor = "red"
    } else if (target == "back") {
        backgroundColor = "white"
    }

    let startLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    let targetLatLong = { latitude: targetLocation[target].lat, longitude: targetLocation[target].lon }
    let distance = (CalculateDistance(startLatLon, targetLatLong, currentLocation.coords.altitude, targetLocation[target].elv))
    if (metric == "ft") {
        distance = distance * 3.28084
    } else if (metric == "yd") {
        distance = distance * 1.09361
    }
    distance = Math.round(distance)
    return (
        <View style={{ ...styles.distanceBox, height: height, backgroundColor: backgroundColor }}>
            <DistanceIcon target={target} type={type}/>
            {type == "large"
                ? <View style={styles.textRow}>
                    <Text style={styles.distanceTextLarge}>{distance}</Text>
                    <Text style={styles.metricTextLarge}>{metric}</Text>
                </View>
                : <View style={styles.textRow}>
                    <Text style={styles.distanceTextSmall}>{distance}</Text>
                    <Text style={styles.metricTextSmallrr}>{metric}</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    distanceBox: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    distanceTextLarge: {
        fontSize: 100
    },
    metricTextLarge: {
        fontSize: 50
    },
    distanceTextSmall: {
        fontSize: 50
    },
    metricTextSmall: {
        fontSize: 25
    },
    textRow: {
        flexDirection: 'row',
        alignItems: "flex-end",
    },
    icon:{
        width: 50,
        height: 50
    }
})

export default DistanceCard;