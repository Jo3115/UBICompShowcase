/**
 * @fileoverview this file represents 
 */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'react-native-elements/dist/helpers';
import { CalculateDistance } from '../../utilities/distance';
import DistanceIcon from './distanceIcon';

/**
 * DistanceCard, renders a DistanceCard component, renders a component displaying distance from current hole with approprate icon and colour depending on target
 * @param {string} target - type of target
 * @param {object} currentLocation - current location object
 * @param {object} targetLocation - target location object
 * @param {string} metric - metric to use
 * @param {string} type - type of card
 */
const DistanceCard = ({ target, currentLocation, targetLocation, metric, type }) => {
    /**
     * getBorder, Function, get border style for card
     */
    let getBorder = () => {
        if (type == 'large') {
            return styles.largeRadius
        } else if (type == 'left') {
            return styles.leftRadius
        }
        return styles.rightRadius
    }

    let height = 100
    if (type == 'large') {
        height = 200
    }
    let backgroundColor = 'rgba(255, 255, 0, 0.8)'
    let fontColor = 'black'
    if (target == 'front') {
        backgroundColor = 'rgba(255, 0, 0, 0.8)'
        fontColor = 'white'
    } else if (target == 'back') {
        backgroundColor = 'rgb(255, 255, 255)'
    }


    let startLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    let targetLatLong = { latitude: targetLocation[target].lat, longitude: targetLocation[target].lon }
    let distance = CalculateDistance(startLatLon, targetLatLong, metric)

    /**
    * getDistanceDisplay, Function, get distance display 
    */
    let getDistanceDisplay = () => {
        let filteredDistance = distance
        let filteredMetric = metric
        let icon = <DistanceIcon target={target} type={type} color={fontColor}/>
        if (distance > 999) {
            filteredDistance = 'Too Far'
            filteredMetric = ''
            icon = <View />
        }
        if (type == 'large') {
            return (
                <View style={styles.textRow}>
                    <View style={styles.iconContainerlarge}>
                        {icon}
                    </View>
                    <Text style={{ ...styles.distanceTextLarge, color: fontColor }}>{filteredDistance}</Text>
                    <Text style={{ ...styles.metricTextLarge, color: fontColor }}>{filteredMetric}</Text>
                </View>
            )
        }
        return (
            <View style={styles.textRow}>
                <View style={styles.iconContainerSmall}>
                    {icon}
                </View>
                <Text style={{ ...styles.distanceTextSmall, color: fontColor }}>{filteredDistance}</Text>
                <Text style={{ ...styles.metricTextSmall, color: fontColor }}>{filteredMetric}</Text>
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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        alignItems: 'flex-end',
    },
    icon: {
        width: 50,
        height: 50
    },
    iconContainerSmall: {
        paddingBottom: 10
    },
    iconContainerlarge: {
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