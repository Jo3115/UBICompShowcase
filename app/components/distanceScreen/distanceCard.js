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
    let height = 100
    if (type == "large") {
        height = 200
    }
    let backgroundColor = "rgba(255, 255, 0, 0.8)"
    if (target == "front") {
        backgroundColor = "rgba(255, 0, 0, 0.8)"
    } else if (target == "back") {
        backgroundColor = "rgb(255, 255, 255)"
    }


    let startLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    let targetLatLong = { latitude: targetLocation[target].lat, longitude: targetLocation[target].lon }
    let distance = CalculateDistance(startLatLon, targetLatLong, metric)//currentLocation.coords.altitude, targetLocation[target].elv

    let getBorder = () => {
        if (type == "large") {
            return styles.largeRadius
        } else if (type == "left") {
            return styles.leftRadius
        }
        return styles.rightRadius
    }

    let getDistanceDisplay = () => {
        let filteredDistance = distance
        let filteredMetric = metric
        let icon = <DistanceIcon target={target} type={type} />
        if (distance > 999) {
            filteredDistance = "Too Far"
            filteredMetric = ""
            icon = <View />
        }
        if (type == "large") {
            return (
                <View style={styles.textRow}>
                    <View style={styles.iconContainerlarge}>
                        {icon}
                    </View>
                    <Text style={styles.distanceTextLarge}>{filteredDistance}</Text>
                    <Text style={styles.metricTextLarge}>{filteredMetric}</Text>
                </View>
            )
        }
        return (
            <View style={styles.textRow}>
                <View style={styles.iconContainerSmall}>
                    {icon}
                </View>
                <Text style={styles.distanceTextSmall}>{filteredDistance}</Text>
                <Text style={styles.metricTextSmall}>{filteredMetric}</Text>
            </View>
        )
    }
    return (
        <View style={{ ...styles.distanceBox, height: height, backgroundColor: backgroundColor, ...getBorder() }}>
            {getDistanceDisplay()}
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
    icon: {
        width: 50,
        height: 50
    },
    iconContainerSmall:{
        paddingBottom: 10 
    },
    iconContainerlarge:{
        paddingBottom: 20 
    },
    largeRadius: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    leftRadius: {
        borderBottomLeftRadius: 20,
    },
    rightRadius: {
        borderBottomRightRadius: 20,
    }
})

export default DistanceCard;