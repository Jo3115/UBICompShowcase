/**
 * @fileoverview this file represents a AddClubModal component, renders a modal allowing the user to input information to add a new club
 */
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native'
import { AvalibleShotMetrics } from '../../utilities/globalVars';
import DropDownPicker from 'react-native-dropdown-picker';
import { AddClub, RemoveClub } from '../../utilities/firebase';
import { ConvertRoundedDistance, ConvertRoundedDistanceToM } from '../../utilities/distance';
import EditClubModalCloseButton from './editClubModalCancelButton';


/**
 * AddClubModal, renders a modal allowing the user to input information to add a new club
 * @param {boolean} modalVisible - boolean determining if the modal is visible
 * @param {Function} setModalVisible - function to set the modal visible value
 * @param {string} userID - string containg user id
 * @param {number} reload - boolean telling the component to reload
 * @param {Function} setReload - function to set the reload value
 * @param {string} club - club to edit
 * @param {string} startingDistance - current distance for the club
 * @param {string} startingMetric - current metric selected
 */
const EditClubModal = ({ modalVisible, setModalVisible, userID, reload, setReload, club, startingDistance, startingMetric }) => {
    const [distance, setDistance] = useState('0');
    const [metricListOpen, setMetricListOpen] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState('m');
    const [metricList, setmetricList] = useState(AvalibleShotMetrics)
    const [showWarning, setShowWarning] = useState(false)

    useEffect(() => {
        setDistance(ConvertRoundedDistance(startingDistance, startingMetric).toString())
        setSelectedMetric(startingMetric)
    }, [modalVisible])

    /**
     * onChangeTextInput, Function, format distance input text to only allow numbers
     * @param {string} text - Id to pin
     */
    const onChangeTextInput = (text) => {
        setDistance(text.replace(/[^0-9]/g, ''))
    }
    /**
     * removeClub, removes a club from the clubs list
     */
    const removeClub = async () => {
        await RemoveClub(userID, club)
        setReload(reload + 1)        
        setModalVisible(!modalVisible)
    }
    /**
     * updateClubOnPress, Function, adds club to firebase with given value
     */
    const updateClubOnPress = async () => {
        if (distance == null) {
            console.log('no distance')
            setShowWarning(true)
        } else {
            await AddClub(userID, club, ConvertRoundedDistanceToM(distance, selectedMetric))
            setReload(reload + 1)
            setModalVisible(false)
        }
    }

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
                    <EditClubModalCloseButton onPress={() => setModalVisible(!modalVisible)} />
                    <Text style={styles.lableText}>Editing: {club}</Text>
                    <Text style={styles.lableText}>Distance:</Text>
                    <View style={styles.rowContainer}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={onChangeTextInput}
                            value={distance}
                            placeholder='Distance'
                            keyboardType='numeric'
                            allowFontScaling={true}
                        />
                        <DropDownPicker
                            zIndex={2000}
                            zIndexInverse={2000}
                            style={styles.metricDropdown}
                            containerStyle={styles.metricDropdownContainer}
                            open={metricListOpen}
                            value={selectedMetric}
                            items={metricList}
                            setOpen={setMetricListOpen}
                            setValue={setSelectedMetric}
                            setItems={setmetricList}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => removeClub()}
                        >
                            <Text style={styles.buttonText}>Delete Club</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonSubmit]}
                            onPress={() => updateClubOnPress()}
                        >
                            <Text style={styles.buttonText}>Save Club</Text>
                        </Pressable>
                    </View>
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
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#472e9a',
        padding: 35,
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
    },
    buttonCancel: {
        backgroundColor: '#ab000d',
    },
    buttonSubmit: {
        backgroundColor: '#4b642d',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    rowContainer: {
        flexDirection: 'row',
    },
    clubDropdown: {
        zIndex: 10,
        borderRadius: 20,
        width: 300,
        height: 50
    },
    clubDropdownContainer: {
        width: 300,
    },
    metricDropdown: {
        zIndex: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: 100,
        height: 50
    },
    metricDropdownContainer: {
        width: 100,
    },
    lableText: {
        fontSize: 18,
        padding: 10,
        alignSelf: 'flex-start'
    },
    textInput: {
        width: 200,
        height: 50,
        textAlignVertical: 'center',
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: 'black',
        paddingBottom: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 10
    }
});

export default EditClubModal;