/**
 * @fileoverview this file represents a AddClubModal component, renders a modal allowing the user to input information to add a new club
 */
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { AvalibleClubs, AvalibleShotMetrics } from '../../utilities/globalVars';
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
const MetricDropdownPicker = ({ metric, onChangeValue }) => {
    const [metricListOpen, setMetricListOpen] = useState(false);
    const [metricList, setmetricList] = useState(AvalibleShotMetrics)
    const [currentMetric, setCurrentMetric] = useState(metric)

    return (
        <DropDownPicker
            zIndex={2000}
            zIndexInverse={2000}
            style={styles.dropdown}
            containerStyle={styles.container}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            labelStyle={styles.labelStyle}
            open={metricListOpen}
            value={currentMetric}
            items={metricList}
            setOpen={setMetricListOpen}
            setValue={setCurrentMetric}
            onChangeValue={(value) => {
                onChangeValue(value)
            }}
            setItems={setmetricList}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        zIndex: 20,
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
        zIndex: 20,
    }
});

export default MetricDropdownPicker;