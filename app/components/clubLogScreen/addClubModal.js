/**
 * @fileoverview this file represents a AddClubModal component, renders a modal allowing the user to input information to add a new club
 */
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native'
import { AvalibleClubs, AvalibleShotMetrics } from '../../utilities/globalVars';
import { GetUserDistances } from '../../utilities/suggestedClub';
import DropDownPicker from 'react-native-dropdown-picker';
import { AddClub } from '../../utilities/firebase';
import { ConvertRoundedDistanceToM } from '../../utilities/distance';


/**
 * AddClubModal, renders a modal allowing the user to input information to add a new club
 * @param {boolean} modalVisible - boolean determining if the modal is visible
 * @param {Function} setModalVisible - function to set the modal visible value
 * @param {string} userID - string containg user id
 * @param {number} reload - boolean telling the component to reload
 * @param {Function} setReload - function to set the reload value
 */
const AddClubModal = ({ modalVisible, setModalVisible, userID, reload, setReload }) => {
    const [userClubBounds, setUserClubBounds] = useState(null)
    const [clubsLoading, setClubsLoading] = useState(true)
    const [clubListOpen, setClubListOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);
    const [clubList, setClubList] = useState([])
    const [distance, setDistance] = useState(null);
    const [metricListOpen, setMetricListOpen] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState('m');
    const [metricList, setmetricList] = useState(AvalibleShotMetrics)
    const [showWarning, setShowWarning] = useState(false)

    /**
     * onChangeTextInput, Function, format distance input text to only allow numbers
     * @param {string} text - Id to pin
     */
    const onChangeTextInput = (text) => {
        setDistance(text.replace(/[^0-9]/g, ''))
    }

    /**
     * addClubOnPress, Function, add club to firebase with given value
     */
    const addClubOnPress = async () => {
        if (selectedClub == null) {
            console.log('no club')
            setShowWarning(true)
        } else if (distance == null) {
            console.log('no distance')
            setShowWarning(true)
        } else {
            await AddClub(userID, selectedClub, ConvertRoundedDistanceToM(distance, selectedMetric))
            setReload(reload += 1)
            setModalVisible(false)
        }
    }

    /**
     * getClubList, Function, get list of avalible clubs and remove any clubs that already have values
     */
    const getClubList = async () => {
        await GetUserDistances(setUserClubBounds, setClubsLoading)
        if (userClubBounds != null) { 
            let currentClubs = Object.values(userClubBounds)
            let sortedClubs = []
            let index = 0
            for (let club in AvalibleClubs) {
                if (!currentClubs.includes(AvalibleClubs[club])) {
                    sortedClubs.push({
                        label: AvalibleClubs[club],
                        value: AvalibleClubs[club]
                    })
                    index++
                }
            }
            setClubList(sortedClubs)
        }
    }
    useEffect(() => {
        setSelectedClub(null)
        setDistance(null)
        getClubList()
    }, [modalVisible])
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
                    <Text style={styles.lableText}>Select Club:</Text>
                    <DropDownPicker
                        zIndex={3000}
                        zIndexInverse={1000}
                        placeholder='Select a Club'
                        searchable={true}
                        searchPlaceholder='Search...'
                        style={styles.clubDropdown}
                        containerStyle={styles.clubDropdownContainer}
                        open={clubListOpen}
                        value={selectedClub}
                        items={clubList}
                        setOpen={setClubListOpen}
                        setValue={setSelectedClub}
                        setItems={setClubList}
                    />
                    <Text style={styles.lableText}>Input Distance:</Text>
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
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonSubmit]}
                            onPress={() => addClubOnPress()}
                        >
                            <Text style={styles.buttonText}>Add Club</Text>
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

export default AddClubModal;