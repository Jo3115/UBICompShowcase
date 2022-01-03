/**
 * @fileoverview this file represents a AddClubModal component, renders a modal allowing the user to input information to add a new club
 */
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { AvalibleClubs, AvalibleShotMetrics, AvalibleTagets } from '../../utilities/globalVars';
import { GetUserDistances } from '../../utilities/suggestedClub';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';
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
const TargetDropdownPicker = ({ target, onChangeValue }) => {
    const [tagetListOpen, setTargetListOpen] = useState(false);
    const [targetList, setTargetList] = useState(AvalibleTagets)
    const [currentTarget, setCurrentTarget] = useState(target)

    return (
        <DropDownPicker
            zIndex={2000}
            zIndexInverse={2000}
            style={styles.dropdown}
            containerStyle={styles.container}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            labelStyle={styles.labelStyle}
            open={tagetListOpen}
            value={currentTarget}
            items={targetList}
            setOpen={setTargetListOpen}
            setValue={setCurrentTarget}
            onChangeValue={(value) => {
                onChangeValue(value)
            }}
            setItems={setTargetList}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        zIndex: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: 110,
        height: 50,
        borderColor: "#994fad"
    },
    container: {
        width: 110,
    },
    labelStyle: {
        fontSize: 18
    },
    dropDownContainerStyle: {
        borderColor: "#994fad",
        zIndex: 10,
    }
});

export default TargetDropdownPicker;