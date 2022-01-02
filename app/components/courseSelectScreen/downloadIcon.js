/**
 * @fileoverview this file represents a DownloadIcon compoenent used to render a icon showing download status
 */
import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';


/**
 * CourseListItem, renders a icon showing download status
 * @param {int} stage - stage of the download to display
 * @param {int} size - stage of icon to display
 * @param {Function} onPress - function to execute icon is pressed
 */
const DownloadIcon = ({ stage, size, onPress }) => {
    let getIcon = () => {
        if (stage == 'downloaded'){
            return <Feather name='check-circle' size={size} color='black' />
        } else if (stage == 'downloading'){
            return <Progress.CircleSnail size={size} indeterminate={true} color={'black'} thickness={2}/>
        }
        return <Feather name='download' size={size} color='black' />
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
        alignContent: 'center',
        padding:10,
    }
});

export default DownloadIcon;