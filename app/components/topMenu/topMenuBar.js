import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TouchableMenuIcon from './touchableMenuIcon';


const TopMenuBar = ({ navigation, title, settingsButton, backButton, backOnPress }) => {
    let SettingsOnPress = () => {
        navigation.push("SettingsScreen")
    }
    return (
        <View style={styles.container}>
            <TouchableMenuIcon icon={"chevron-left"} active={backButton} onPress={backOnPress}/>
            <Text style={styles.text}>
                {title}
            </Text>
            <TouchableMenuIcon icon={"settings"} active={settingsButton} onPress={SettingsOnPress}/>
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