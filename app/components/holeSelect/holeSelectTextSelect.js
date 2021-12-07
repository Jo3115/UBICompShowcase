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
    return (
        <View>
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
        fontSize: 30
    },
    holeTouchable: {
        height: "100%",
        width: 150,
        backgroundColor: "red",
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