/**
 * @fileoverview this file represents a ClubDataDisplayListItem compoenent used to render club information as a list item
 * also renders a right swipable revealing a delete button
 */
import React, { useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler';
import { ConvertRoundedDistance } from '../../utilities/distance';
import { RemoveClub } from '../../utilities/firebase';
import ClubDataDisplayListItemSwipable from './clubDataDisplayListItemSwipable';

/**
 * ClubDataDisplayListItem, renders club information as a list item
 * @param {string} club - the club name
 * @param {number} distance - the distance the club travels
 * @param {boolean} custom - boolean determining if using custom club data
 * @param {string} userID - string containg user id
 * @param {Function} getClubData - function used to re get club data to update the list if a club is removed
 */
const ClubDataDisplayListItem = ({ club, distance, custom, userID, getClubData, metric }) => {
    const swipeableRef = useRef(null);

    /**
     * removeClub, removes a club from the clubs list
     */
    const removeClub = async () => {
        await RemoveClub(userID, club)
        getClubData()
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={() => (
                <ClubDataDisplayListItemSwipable custom={custom} removeOnPress={removeClub}/>
            )}
        >
            <View style={styles.listHeader}>
                <Text style={styles.clubText}>
                    {club}
                </Text>
                <Text style={styles.distanceText}>
                    {ConvertRoundedDistance(distance, metric)}{metric}
                </Text>
            </View>
        </Swipeable>
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
        fontSize: 25
    },
    distanceText: {
        fontSize: 25
    }
});

export default ClubDataDisplayListItem;