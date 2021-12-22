/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Switch } from 'react-native'
import { ConvertRoundedDistance } from '../../utilities/distance';

const metric = "yd"

/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const UsePersonailsedClubsToggle = ({ current, onValueChange }) => {
    return (
        <View style={styles.container}>
            <Text>Use Custom Club Distances</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={current ? '#f5dd4b' : '#f4f3f4'}
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
        padding: 10,
    },
});

export default UsePersonailsedClubsToggle;