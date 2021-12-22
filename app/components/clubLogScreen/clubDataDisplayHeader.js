/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'

/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const ClubDataDisplayHeader = ({ title }) => {
    return (
        <View style={styles.listHeader}>
            <Text style={styles.text}>
                {title}s
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        flexBasis: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#a696ce"
    },
    text: {
        fontSize: 20
    }
});

export default ClubDataDisplayHeader;