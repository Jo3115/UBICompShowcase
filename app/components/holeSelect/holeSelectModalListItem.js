/**
 * @fileoverview this file represents a HoleSelectModalListItem component, renders a list item containg a hole number with different formating if its the current hole
 */
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'


/**
 * ForcastListItem, renders a list item containg a hole number with different formating if its the current hole
 * @param {int} holeNumber - number of this list item
 * @param {int} currentHole - currently selected hole
 * @param {Function} onPress - on press function to update current hole
 */
const HoleSelectModalListItem = ({ holeNumber, currentHole, onPress }) => {
    /**
     * getBackgroundColor, Function, determines background colour bassed on if this hole is the current hole
     */
    let getBackgroundColor = () => {
        if (holeNumber == currentHole){
            return '#472e9a'
        }
        return 'white'
    }
    /**
     * getTextColor, Function, determines text colour bassed on if this hole is the current hole
     */
    let getTextColor = () => {
        if (holeNumber == currentHole){
            return 'white'
        }
        return 'black'
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: '#c9c0e1',
        borderWidth: 2,
        borderRadius: 20
    },
    holeText: {
        fontSize:28
    }
})

export default HoleSelectModalListItem;