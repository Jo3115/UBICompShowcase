/**
 * @fileoverview this file represents a DistanceIcon component, renders a image displaying appropate icon bassed on target
 */
import React from 'react'
import { StyleSheet, Image } from 'react-native'

/**
 * DistanceIcon, renders a image displaying appropate icon bassed on target
 * @param {string} target - type of icon to display
 * @param {string} type - size of icon to display bassed on card type
 */
const DistanceIcon = ({ target, type, color }) => {
    let url = 'https://cdn.discordapp.com/attachments/636495064914198529/918160207098568714/middle.png'
    if (target == 'front') {
        url = 'https://cdn.discordapp.com/attachments/636495064914198529/918160207631253574/front.png'
    } else if (target == 'back') {
        url = 'https://cdn.discordapp.com/attachments/636495064914198529/918160207455080448/back.png'
    }
    if (type == 'large') {
        return <Image
            style={styles.iconLarge}
            source={{
                uri: url
            }}
            tintColor={color}
        />
    }
    return <Image
        style={styles.icon}
        source={{
            uri: url
        }}
        tintColor={color}
    />
}

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50
    },
    iconLarge: {
        width: 100,
        height: 100
    }
})

export default DistanceIcon;