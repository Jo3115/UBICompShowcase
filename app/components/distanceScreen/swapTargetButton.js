/**
 * @fileoverview this file represents a CloseButton component, renders a component swap boxes symbol and allowing the user to tap to swap the taget
 */
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * CloseButton, renders a component swap boxes symbol and allowing the user to tap to swap the taget
 * @param {Function} onPress - function to execute icon is pressed
 */
const SwapTargetButton = ({ onPress }) => {
    return (
        <View style={styles.possitioning}>
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={styles.icon}
                    source={{
                        uri: "https://cdn.discordapp.com/attachments/892432524704354364/930483116919914566/file-swap_48076.png"
                    }}
                    tintColor={"black"}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    possitioning: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        zIndex: 1,
        elevation: 1,
        right: 15,
        top: 15,
        marginLeft: 5
    },
    icon: {
        width: 38,
        height: 38
    },
})

export default SwapTargetButton;