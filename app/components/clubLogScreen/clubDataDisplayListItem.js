/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler';
import { ConvertRoundedDistance } from '../../utilities/distance';
import { RemoveClub } from '../../utilities/firebase';
import ClubDataDisplayListItemSwipable from './clubDataDisplayListItemSwipable';

const metric = "yd"

/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const ClubDataDisplayListItem = ({ club, distance, custom, userID, getClubData }) => {
    const swipeableRef = useRef(null);

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