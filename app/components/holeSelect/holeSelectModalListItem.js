/**
 * @fileoverview this file represents a HoleSelectTextSelect component, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 */
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";


/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const HoleSelectModalListItem = ({ holeNumber, currentHole, onPress }) => {

    let getBackgroundColor = () => {
        if (holeNumber == currentHole){
            return "white"
        }
        return "red"
    }

    return (
        <TouchableHighlight
            style={{...styles.touchable, backgroundColor: getBackgroundColor()}}
            activeOpacity={0.6}
            underlayColor='#DDDDDD'
            onPress={() => onPress(holeNumber)}>
            <Text style={styles.holeText}>{holeNumber}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    touchable: {
        width: 65,
        height: 65,
        margin: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    holeText: {
        fontSize:28
    }
})

export default HoleSelectModalListItem;