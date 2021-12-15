/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';


/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const DownloadIcon = ({ stage, size, onPress }) => {
    let getIcon = () => {
        if (stage == "downloaded"){
            return <Feather name="check-circle" size={size} color="black" />
        } else if (stage == "downloading"){
            return <Progress.CircleSnail size={size} indeterminate={true} color={"black"} thickness={2}/>
        }
        return <Feather name="download" size={size} color="black" />
    }
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor='#DDDDDD'
            onPress={() => onPress()}
            style = {styles.touchable}
        >
            {getIcon()}
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    touchable: {
        alignContent: "center",
        padding:10,
    }
});

export default DownloadIcon;