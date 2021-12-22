/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { ConvertRoundedDistance } from '../../utilities/distance';

const metric = "yd"

/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const ClubDataDisplayListItem = ({ club, distance }) => {
    return (
        <View style={styles.listHeader}>
            <Text style={styles.clubText}>
                {club}
            </Text>
            <Text style={styles.distanceText}>
                {ConvertRoundedDistance(distance, metric)}{metric}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        flexBasis: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "white"
    },
    clubText: {
        fontSize: 25
    },
    distanceText: {
        fontSize: 25
    }
});

export default ClubDataDisplayListItem;