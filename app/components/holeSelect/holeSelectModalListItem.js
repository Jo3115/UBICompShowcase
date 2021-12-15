/**
 * @fileoverview this file represents a HoleSelectTextSelect component, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 */
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'


/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const HoleSelectModalListItem = ({ holeNumber, currentHole, onPress }) => {

    let getBackgroundColor = () => {
        if (holeNumber == currentHole){
            return "#472e9a"
        }
        return "white"
    }

    let getTextColor = () => {
        if (holeNumber == currentHole){
            return "white"
        }
        return "black"
    }

    return (
        <TouchableHighlight
            style={{...styles.touchable, backgroundColor: getBackgroundColor()}}
            activeOpacity={0.6}
            underlayColor='#DDDDDD'
            onPress={() => onPress(holeNumber)}>
            <Text style={{...styles.holeText, color: getTextColor()}}>{holeNumber}</Text>
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
        borderRadius: 20,
        borderColor: "#c9c0e1",
        borderWidth: 2,
        borderRadius: 20
    },
    holeText: {
        fontSize:28
    }
})

export default HoleSelectModalListItem;