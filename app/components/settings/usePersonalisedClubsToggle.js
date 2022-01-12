/**
 * @fileoverview this file represents a UsePersonailsedClubsToggle compoenent used to render a toggle switch allowing to swap between two values
 */
import React from 'react'
import { StyleSheet, View, Text, Switch } from 'react-native'

/**
 * UsePersonailsedClubsToggle, renders a toggle switch allowing to swap between two values
 * @param {boolean} current - the current value of the switch
 * @param {Function} onValueChange - the function to run when the switch is pressed
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