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
function CourseListItemSwipe({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress()}
        >
            <View style={styles.button}>
                <Text>REMOVE LOCAL COPPY</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        height: '100%',
    },
    button: {
        width: "95%",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    }
});

export default CourseListItemSwipe;
