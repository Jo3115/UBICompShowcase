/**
 * @fileoverview this file represents a ClubDataDisplayListItemSwipable compoenent used to render a right swipable revealing a delete button
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

/**
 * ClubDataDisplayListItemSwipable Component, render a right swipable revealing a delete button
 * @param {boolean} custom - boolean determining if using custom club data
 * @param {Function} removeOnPress - the function to execute when the delet button is pressed
 */
function ClubDataDisplayListItemSwipable({ custom, removeOnPress }) {
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
        width: '30%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ab000d',
    },
    buttonText: {
        paddingHorizontal: 0,
        fontSize: 16,
        color: '#f5f5f5',
        textAlign: 'center'
    }
});

export default ClubDataDisplayListItemSwipable;
