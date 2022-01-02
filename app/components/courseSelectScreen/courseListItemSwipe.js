/**
 * @fileoverview this file represents a CourseListItemSwipe compoenent used to render a right swipable revealing a delete download button
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';



/**
 * CourseListItemSwipe Component, render a right swipable revealing a delete download button
 * @param {Function} onPress - the function to execute when the pinned icon is pressed
 */
function CourseListItemSwipe({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress()}
        >
            <View style={styles.button}>
                <Text style={styles.text}>REMOVE DOWNLOADED COURSE</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: '100%',
    },
    button: {
        width: '95%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ab000d',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        paddingHorizontal: 0,
        fontSize :16,
        color: 'white',
        textAlign:'center'
    }
});

export default CourseListItemSwipe;
