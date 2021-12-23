import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SectionList, TouchableOpacity } from 'react-native';

const ClubDataEmptyMesage = ({ modal, setModal }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {setModal(!modal)}}
        >
            <Text style={styles.noContentText}>No Clubs Stored Press the + to start adding clubs </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
});

export default ClubDataEmptyMesage;