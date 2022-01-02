/**
 * @fileoverview this file represents a ClubDataEmptyMesage compoenent used to render a message if no custom clubs are found
 */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/**
 * ClubDataEmptyMesage, renders a message if no custom clubs are found and adds a button to alow a user to add a club
 * @param {boolean} modal - boolean determining if the addClubModal is visible
 * @param {Function} setModal - function to set the addClubModal visible value
 */
const ClubDataEmptyMesage = ({ modal, setModal }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {setModal(!modal)}}
        >
            <Text style={styles.noContentText}>No Clubs Stored Press the + to start adding clubs </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});

export default ClubDataEmptyMesage;