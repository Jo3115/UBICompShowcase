/**
 * @fileoverview this file represents a Seperator compoenent used to render a seperating line of varying height
 */
import React from 'react'
import {View} from 'react-native'

/**
 * Seperator, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const Seperator = ({height}) => {
    let heightDefaulted = height
    if (height === undefined){
        heightDefaulted = 1
    }
    return (
        <View style={{
            width: '100%',
            height: heightDefaulted,
            backgroundColor: 'lightgray',
        }} />
    );
}

export default Seperator;