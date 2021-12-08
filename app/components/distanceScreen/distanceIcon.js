/**
 * @fileoverview this file represents a HoleSelect component, renders a component displaying current hole and allowing the user to navigate to a given hole.
 */
import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const DistanceIcon = ({ target, type }) => {
    let url = "https://cdn.discordapp.com/attachments/636495064914198529/918160207098568714/middle.png"
    if (target == "front") {
        url = 'https://cdn.discordapp.com/attachments/636495064914198529/918160207631253574/front.png'
    } else if (target == "back") {
        url = 'https://cdn.discordapp.com/attachments/636495064914198529/918160207455080448/back.png'
    }
    if (type == "large") {
        return <Image
            style={styles.iconLarge}
            source={{
                uri: url
            }}
        />
    }
    return <Image
        style={styles.icon}
        source={{
            uri: url
        }}
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