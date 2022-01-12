/**
 * @fileoverview this file represents a EditClubModalCloseButton component, renders a component displaying X symbol and allowing the user to tap to cancel out of the modal
 */
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

/**
 * EditClubModalCloseButton, renders a component displaying X symbol and allowing the user to tap to cancel out of the modal
 * @param {Function} onPress - function to execute icon is pressed
 */
const EditClubModalCloseButton = ({onPress}) => {
    return (
        <View style={styles.possitioning}>
            <TouchableOpacity onPress={onPress}>
                <AntDesign name='close' size={30} color='rgba(0,0,0,0.5)' />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    possitioning: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        zIndex: 1,
        elevation: 1,
        right: 10,
        top: 10,
        marginLeft: 5
    },
})

export default EditClubModalCloseButton;