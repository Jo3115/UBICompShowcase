/**
 * @fileoverview this file represents a HoleSelectTextSelect component, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 */
import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

/**
 * HoleSelectTextSelect, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 * @param {int} currentHole - currently selected hole
 * @param {boolean} modalVisible - boolean determining if the HoleSelectModal is visible
 * @param {Function} setModalVisible - function to set the HoleSelectModal visible value 
 */
const HoleSelectTextSelect = ({ currentHole, modalVisible, setModalVisible }) => {
    let getText = () => {
        if (modalVisible){
            return <Text style={styles.holeText}>Close</Text>
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
        backgroundColor: '#472e9a',
        position: 'absolute',
        bottom: 10,
        zIndex: 100,
        elevation: 100,
        borderColor: "#c9c0e1",
        borderWidth: 2,
        borderRadius: 20
    },
    holeTouchable: {
        borderRadius: 18,
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