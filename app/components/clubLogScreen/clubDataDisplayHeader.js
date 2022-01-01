/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const ClubDataDisplayHeader = ({ title, custom, currentUser, modal, setModal, }) => {
    const renderPlus = () => {
        if (currentUser != null && custom) {
            return (
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => { setModal(!modal) }}
                >
                    <AntDesign name="plus" size={26} color="white" />
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.listHeader}>
            <Text style={styles.text}>
                {title}s
            </Text>
            {renderPlus()}
        </View>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        flexBasis: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#a696ce",
        height: 52
    },
    text: {
        fontSize: 20
    },
    touchable: {
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 2
    }
});

export default ClubDataDisplayHeader;