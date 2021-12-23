/**
 * @fileoverview this file represents a HoleSelectTextSelect component, renders a component displaying current hole and allowing the user to tap to reveal a quick select menu
 */
import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Modal, Pressable } from 'react-native'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useEffect } from 'react/cjs/react.development';
import { AvalibleClubs } from '../../utilities/globalVars';
import { GetUserDistances } from '../../utilities/suggestedClub';



/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const AddClubModal = ({ modalVisible, setModalVisible }) => {
    const [userClubBounds, setUserClubBounds] = useState(null)
	const [clubsLoading, setClubsLoading] = useState(true)


    const getClubList = async () => {
        await GetUserDistances(setUserClubBounds, setClubsLoading)
        console.log(userClubBounds)
        let currentClubs = Object.keys(userClubBounds)
        let sortedClubs = []
        let index = 0
        for (let club in AvalibleClubs) {
            console.log(club)
            if (!currentClubs.includes(AvalibleClubs[club])) {
                sortedClubs.push({
                    id: index,
                    name: AvalibleClubs[club]
                })
                index++
            }
        }
    }

    useEffect(() => {
        getClubList()
    }, [modalVisible])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.rowContainer}>
                        <SearchableDropdown

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
                            onPress={() => setModalVisible(!modalVisible)}
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
    },
    buttonCancel: {
        backgroundColor: "#ab000d",
    },
    buttonSubmit: {
        backgroundColor: "#4b642d",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    }
});

export default AddClubModal;