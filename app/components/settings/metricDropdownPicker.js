/**
 * @fileoverview this file represents a MetricDropdownPicker component, renders a dropdown list containing different metrics avalible
 */
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { AvalibleShotMetrics } from '../../utilities/globalVars';
import DropDownPicker from 'react-native-dropdown-picker';


/**
 * MetricDropdownPicker, renders a dropdown list containing different metrics avalible
 * @param {string} metric - current metric to display
 * @param {Function} onChangeValue - function to run when value changes
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