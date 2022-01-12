/**
 * @fileoverview this file represents a ClubDataDisplayListItem compoenent used to render club information as a list item
 */
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ConvertRoundedDistance } from '../../utilities/distance';

/**
 * ClubDataDisplayListItem, renders club information as a list item
 * @param {string} club - the club name
 * @param {number} distance - the distance the club travels
 * @param {Function} getClubData - function used to re get club data to update the list if a club is removed
 * @param {Function} onPress - function to trigger when list item is pressed
 */
const ClubDataDisplayListItem = ({ club, distance, metric, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={styles.listHeader}>
                <Text style={styles.clubText}>
                    {club}
                </Text>
                <Text style={styles.distanceText}>
                    {ConvertRoundedDistance(distance, metric)}{metric}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        flexBasis: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white'
    },
    clubText: {
        fontSize: 30
    },
    distanceText: {
        fontSize: 30
    }
});

export default ClubDataDisplayListItem;