/**
 * @fileoverview this file represents a CloseButton component, renders a component displaying X symbol and allowing the user to tap to return to previous screen
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


/**
 * CloseButton, renders a component displaying X symbol and allowing the user to tap to return to previous screen
 * @param {Function} onPress - function to execute icon is pressed
 */
const CloseButton = ({onPress}) => {
    return (
        <View style={styles.possitioning}>
            <TouchableOpacity onPress={onPress}>
                <AntDesign name='close' size={40} color='black' />
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
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        zIndex: 1,
        elevation: 1,
        left:10,
        top: 15,
        marginLeft: 5
    }
})

export default CloseButton;