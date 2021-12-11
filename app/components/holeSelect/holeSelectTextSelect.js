/**
 * @fileoverview this file represents a HoleSelectTextSelect component, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 */
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import HoleSelectModal from './holeSelectModal';



/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const HoleSelectTextSelect = ({ currentHole, modalVisible, setModalVisible }) => {
    let getText = () => {
        if (modalVisible){
            return <AntDesign name="close" size={40} color="white" />
        }
        return <Text style={styles.holeText}>Hole: {currentHole}</Text>
    }
    return (
        <View style={styles.holeButton}>
            <TouchableHighlight
                style={styles.holeTouchable}
                activeOpacity={0.6}
                underlayColor='#DDDDDD'
                onPress={() => setModalVisible(!modalVisible)}>
                {getText()}
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    holeText: {
        fontSize: 30,
        color: "white"
    },
    holeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        backgroundColor: '#0046cf',
        position: 'absolute',
        bottom: 10,
        zIndex: 100,
        elevation: 100,
        borderColor: "#98a7ed",
        borderWidth: 2,
        borderRadius: 20
    },
    holeTouchable: {
        borderRadius: 20,
        height: "100%",
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    holeSelectModal: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 50,
    },
    holeSelectModalContent: {
        backgroundColor: "green",
        alignItems: "center",
        width: "100%",
        height: 200,
    }
})

export default HoleSelectTextSelect;