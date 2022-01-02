/**
 * @fileoverview this file represents a ClubDataDisplayHeader compoenent used to render a headder to seperate the clubs into different catagories
 */
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

/**
 * ClubDataDisplayHeader, renders a headder to seperate the clubs into different catagories
 * @param {string} title - the title of the section 
 * @param {boolean} custom - boolean determining if using custom club data
 * @param {object} currentUser - object containg current user information
 * @param {boolean} modal - boolean determining if the addClubModal is visible
 * @param {Function} setModal - function to set the addClubModal visible value
 */
const ClubDataDisplayHeader = ({ title, custom, currentUser, modal, setModal, }) => {
    /**
     * renderPlus, Function, render pluss icon if using custom list
     */
    const renderPlus = () => {
        if (currentUser != null && custom) {
            return (
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => { setModal(!modal) }}
                >
                    <AntDesign name='plus' size={26} color='white' />
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
        flexBasis: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#a696ce',
        height: 52
    },
    text: {
        fontSize: 20
    },
    touchable: {
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 2
    }
});

export default ClubDataDisplayHeader;