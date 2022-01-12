/**
 * @fileoverview this file represents a TopMenuBar compoenent used to render a top bar containg page name and a setting or back icon
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TouchableMenuIcon from './touchableMenuIcon';

/**
 * TopMenuBar component, renders a top bar containg page name and a setting or back icon
 * @param {object} navigation - Navigaction object to allow for moving between pages
 * @param {string} title - title of the page
 * @param {boolean} settingsButton - wether to display the settings icon
 * @param {boolean} backButton - wether to display the back icon
 * @param {Function} backOnPress - function to run when back button pressed
 */
const TopMenuBar = ({ navigation, title, settingsButton, backButton, backOnPress }) => {
    let SettingsOnPress = () => {
        navigation.push('SettingsScreen')
    }
    return (
        <View style={styles.container}>
            <TouchableMenuIcon icon={'chevron-left'} active={backButton} onPress={backOnPress}/>
            <Text style={styles.text}>
                {title}
            </Text>
            <TouchableMenuIcon icon={'settings'} active={settingsButton} onPress={SettingsOnPress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height: 50,
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: '#694fad',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    text:{
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    }
});
export default TopMenuBar;