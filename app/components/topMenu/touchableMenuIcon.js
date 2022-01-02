/**
 * @fileoverview this file represents a TouchableMenuIcon compoenent used to render a touchable icon
 */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * TouchableMenuIcon component, renders a touchable icon
 * @param {string} icon - which icon to display
 * @param {boolean} active - if the icon is active or not
 * @param {Function} backOnPress - function to run when icon pressed
 */
const TouchableMenuIcon = ({ icon, active, onPress }) => {
    if (!active) {
        return <Feather name="settings" size={30} color="#694fad" />
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Feather name={icon} size={30} color={"white"} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: "white"
    }
});
export default TouchableMenuIcon;