/**
 * @fileoverview this file represents a CourseListItem compoenent used to render a seperating line of varying height
 */
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

/**
 * CourseListItem, renders a seperating Line in lightgray with varying height
 * @param {int} height - the height of the seperator to render
 */
const CourseListItem = ({ name, distance, onPress }) => {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor='#DDDDDD'
            onPress={() => onPress()}
        >
            <View style={styles.listCard}>
                <View>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.distanceText}>{distance / 1000} Km</Text>
                </View>
                <AntDesign name="right" size={30} color="black" />
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    listCard: {
        height: 75,
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    nameText: {
        fontSize: 30
    },
    distanceText: {
        fontSize: 20
    }
});

export default CourseListItem;