/**
 * @fileoverview this file represents a ClubLogWarningModal component, renders a modal displaying a warning message
 */
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native'
import { AvalibleShotMetrics } from '../../utilities/globalVars';
import DropDownPicker from 'react-native-dropdown-picker';
import { AddClub, RemoveClub } from '../../utilities/firebase';
import { ConvertRoundedDistance, ConvertRoundedDistanceToM } from '../../utilities/distance';
import EditClubModalCloseButton from './editClubModalCancelButton';


/**
 * ClubLogWarningModal, renders a modal displaying a warning message
 * @param {boolean} modalVisible - boolean determining if the modal is visible
 * @param {Function} setModalVisible - function to set the modal visible value

 */
const ClubLogWarningModal = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal
            transparent={true}
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.text}>Editing clubs only avalible when using Custom Distances</Text>
                    <Pressable
                        style={styles.button}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '120%',
        width: '100%',
        position: 'absolute',
        top: -100,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#472e9a',
        margin: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    button: {
        width: 120,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        backgroundColor: '#ab000d',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    text: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center'
    },
});

export default ClubLogWarningModal;