import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


const TopMenuBar = ({ title }) => {
    return (
        <View style={styles.container}>
            <Feather name="settings" size={30} color="#694fad" />
            <Text style={styles.text}>
                {title}
            </Text>
            <Feather name="settings" size={30} color="white" />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height: 50,
        width: "100%",
        flexDirection:"row",
        justifyContent:'space-between',
        backgroundColor: "#694fad",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    text:{
        fontSize: 30,
        color: "white"
    }
});
export default TopMenuBar;