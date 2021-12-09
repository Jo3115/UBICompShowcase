/**
 * @fileoverview this file represents a HoleSelectTextSelect component, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 */
import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";
import HoleSelectModalListItem from './holeSelectModalListItem';


/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const HoleSelectModal = ({ currentHole, maxHoles, modalVisible, setModalVisible, setHole }) => {
    let holeList = Array.from({ length: maxHoles }, (_, i) => i + 1)
    
    const closeModal = () => {
        setModalVisible(!setModalVisible)
    }
    const renderItem = ({ item }) => (
        <HoleSelectModalListItem holeNumber={item} currentHole={currentHole} setHole={setHole} onPress={updateCurrentHole}/>
    );
    const updateCurrentHole = (holeNumber) => {
        setHole(holeNumber)
        closeModal()
    }
    return (
        <Modal
            style={styles.holeSelectModal}
            isVisible={modalVisible}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}
            backdropOpacity={0}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
        >
            <View style={styles.holeSelectModalContent}>
                <FlatList
                    columnWrapperStyle={{justifyContent:"space-evenly"}}
                    data={holeList}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    numColumns={3}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    holeSelectModal: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 50,
    },
    holeSelectModalContent: {
        backgroundColor: "green",
        alignItems: "center",
        width: "80%",
    }
})

export default HoleSelectModal;