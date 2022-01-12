/**
 * @fileoverview this file represents a HoleSelectModal component, renders a modal displaying current hole and allowing the user to select a hole
 */
import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import HoleSelectModalListItem from './holeSelectModalListItem';

/**
 * ForcastListItem, renders a modal displaying current hole and allowing the user to select a hole
 * @param {int} currentHole - currently selected hole
 * @param {int} maxHoles - maximum holes on given corse
 * @param {boolean} modalVisible - boolean determining if the HoleSelectModal is visible
 * @param {Function} setModalVisible - function to set the HoleSelectModal visible value 
 * @param {Function} setHole - set current hole
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
                <Text>Select Hole</Text>
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
        borderColor: "#472e9a",
        borderWidth: 2,
        borderBottomWidth: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius:20,
    }
})

export default HoleSelectModal;