/**
 * @fileoverview This file represents the component that is rendered when a spotsListItem is swipped to the right
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';



/**
 * SpotsListItemPin Component, render a pin icon indicating if the item is pinned or not and allow it to be presed to pin the spot
 * @param {boolean} pinned - is the current spot pinned
 * @param {Function} onPress - the function to execute when the pinned icon is pressed
 */
function ClubDataDisplayListItemSwipable({ custom, removeOnPress, editOnPress }) {
    if (!custom) {
        return (
            <View style={styles.container}>
                <Text style={styles.warningText}>Club customisation is not avalible for the default list.</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.edditButton}
                onPress={() => onPress()}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>EDIT DISTANCE</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeOnPress()}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>REMOVE CLUB</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "60%",
        height: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButton: {
        width: "50%",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ab000d",
    },
    edditButton: {
        width: "50%",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#92ad4f",
    },
    warningText: {
        paddingHorizontal: 0,
        fontSize: 16,
        color: "black",
        textAlign: "center"
    },
    buttonText: {
        paddingHorizontal: 0,
        fontSize: 16,
        color: "#f5f5f5",
        textAlign: "center"
    }
});

export default ClubDataDisplayListItemSwipable;