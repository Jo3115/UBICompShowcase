/**
 * @fileoverview this file represents a ClubDataEmptyMesage compoenent used to render a message if no custom clubs are found
 */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
            <View style={styles.iconContainer}>
                <AntDesign name='plus' size={40} color='black' />
            </View>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconContainer:{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 100,
        marginTop: 20,
    }
});

export default ClubDataEmptyMesage;