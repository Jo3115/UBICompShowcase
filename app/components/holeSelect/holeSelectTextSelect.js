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
const HoleSelectTextSelect = ({ currentHole, setHole, maxHoles }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(!setModalVisible)
    }
    let rounded = styles.holeButtonRouded
    if (modalVisible) {
        rounded = styles.holeButtonSquare
    }
    return (
        <View style={{...styles.holeButton, ...rounded}}>
            <TouchableHighlight
                style={styles.holeTouchable}
                activeOpacity={0.6}
                underlayColor='#DDDDDD'
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.holeText}>Hole: {currentHole}</Text>
            </TouchableHighlight>
            <HoleSelectModal currentHole={currentHole} maxHoles={maxHoles} modalVisible={modalVisible} setModalVisible={setModalVisible} setHole={setHole}/>
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        bottom: 10,
        zIndex: 1,
        elevation: 1,
        borderColor: "#98a7ed",
        borderWidth: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    holeButtonRouded: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    holeButtonSquare: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    holeTouchable: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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