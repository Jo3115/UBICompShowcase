/**
 * @fileoverview this file represents a HoleSelectTextSelect component, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 */
import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";
import HoleSelectModalListItem from './holeSelectModalListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';


/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const HoleSelectModal = ({ currentHole, maxHoles, modalVisible, setModalVisible, setHole }) => {
    let holeList = Array.from({ length: maxHoles }, (_, i) => i + 1)
    const renderItem = ({ item }) => (
        <HoleSelectModalListItem holeNumber={item} currentHole={currentHole} setHole={setHole} onPress={updateCurrentHole} />
    );
    const updateCurrentHole = (holeNumber) => {
        setHole(holeNumber)
    }
    if (!modalVisible) {
        return <View />
    }
    return (
        <View style={styles.backgroundContainer}>
            <TouchableOpacity 
                style={styles.closeTouchable}
                onPress={() => {setModalVisible(!modalVisible)}}
            >
            </TouchableOpacity>
            <View style={styles.holeSelectModalContent}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    data={holeList}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    numColumns={3}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        width: "110%",
        height: "110%",
        position: 'absolute',
        zIndex: 10,
        elevation: 10,
        bottom: 0
    },
    closeTouchable:{
        width: "100%",
        height: "100%",
    },
    holeSelectModal: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 75,
    },
    holeSelectModalContent: {
        backgroundColor: "white",
        alignItems: "center",
        alignSelf: "center",
        position: 'absolute',
        zIndex: 20,
        elevation: 20,
        paddingBottom: 40,
        bottom: 50,
        borderColor: "#98a7ed",
        borderWidth: 2,
        borderRadius: 20
    }
})

export default HoleSelectModal;