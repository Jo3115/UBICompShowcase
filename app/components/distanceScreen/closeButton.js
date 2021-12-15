/**
 * @fileoverview this file represents a HoleSelectTextSelect component, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 */
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const CloseButton = ({onPress}) => {
    return (
        <View style={styles.possitioning}>
            <TouchableOpacity onPress={onPress}>
                <AntDesign name="close" size={40} color="black" />
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