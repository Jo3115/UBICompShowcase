/**
 * @fileoverview this file represents a TargetDropdownPicker component, renders a dropdown list containing different targets avalible
 */
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { AvalibleTagets } from '../../utilities/globalVars';
import DropDownPicker from 'react-native-dropdown-picker';

/**
 * TargetDropdownPicker, renders a dropdown list containing different targets avalible
 * @param {string} target - current target value to display
 * @param {Function} onChangeValue - function to run when value changes
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