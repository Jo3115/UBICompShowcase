import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


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