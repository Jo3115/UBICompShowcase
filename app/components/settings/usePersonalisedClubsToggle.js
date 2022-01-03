/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React from 'react'
import { StyleSheet, View, Text, Switch } from 'react-native'

/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const UsePersonailsedClubsToggle = ({ current, onValueChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Use Custom Club Distances</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#a696ce' }}
                thumbColor={current ? '#994fad' : '#f4f3f4'}
                onValueChange={() => onValueChange()}
                value={current}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    text: {
        fontSize:20,
    }
});

export default UsePersonailsedClubsToggle;