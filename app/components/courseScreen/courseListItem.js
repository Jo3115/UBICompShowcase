/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import DownloadIcon from './downloadIcon';
import { useEffect, useState } from 'react/cjs/react.development';
import { CheckKey } from '../../utilities/asyncStorage';


/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const CourseListItem = ({ name, distance, onPress, downloadStateIn }) => {
    const [downloadState, setDownloadState] = useState("download")

    useEffect(() => {
        switch (CheckKey(name)){
            case true:
                setDownloadState("downloaded")
            case false: 
                setDownloadState("download")
        }
    }, [])

    const downloadOnPress = (name) => {
        console.log(name)
    }

    return (
        <TouchableHighlight
            style={styles.touchable}
            activeOpacity={0.6}
            underlayColor='#DDDDDD'
            onPress={() => onPress()}
        >
            <View style={styles.listCard}>
                <View>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.distanceText}>{distance / 1000} Km</Text>
                </View>
                <View style={styles.rowCard}>
                    <DownloadIcon stage={downloadState} size={40} onPress={downloadOnPress((name))}/>
                    <AntDesign name="right" size={30} color="black" />
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    touchable: {
        height: 75,
        width: "100%",
        backgroundColor: "white"
    },
    listCard: {
        flex: 1,
        height: 75,
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly",
        paddingHorizontal: 10,
    },
    rowCard: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    nameText: {
        fontSize: 30
    },
    distanceText: {
        fontSize: 20
    },
});

export default CourseListItem;