/**
 * @fileoverview this file represents the SettingsScreen screen renders current settings and appropate inputs to change them.
 * Also renders user information and logout button if logged in. 
 */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { GetData, StoreJsonData } from '../utilities/asyncStorage';
import UserLoggedInDisplay from '../components/userInfo/userLoggedInDisplay';
import UsePersonailsedClubsToggle from '../components/settings/usePersonalisedClubsToggle';

/**
 * SettingsScreen Screen, renders current settings and appropate inputs to change them.
 * @param {object} navigation - navigation object passed from previous screen allows for navigating to different screens
 */
const SettingsScreen = ({ navigation }) => {
    const [settings, setSettings] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    /**
     * GetCurrentUser, Function, gets the current logged in user if avalible from async storage
     */
    const GetCurrentUser = async () => {
        setCurrentUser(JSON.parse(await GetData('user')))
    }

    /**
     * BackOnPress, Function, return to previous screen
     */
    const BackOnPress = () => {
        navigation.pop()
    }
    
    /**
     * GetSettings, Function, gets the current settings from async storage
     */
    const GetSettings = async () => {
        setSettings(JSON.parse(await GetData('settings')))
    }

    /**
     * toggleCustomSwitch, Function, toggles wether to use custom distances or not
     */
    const toggleCustomSwitch = async () => {
        let changedSettings = settings
        changedSettings.customDistances = !settings.customDistances
        setSettings({ ...changedSettings })
        await StoreJsonData('settings', changedSettings)
    }

    useEffect(() => {
        GetSettings()
        GetCurrentUser()
    }, [])

    console.log(settings)

    return (
        <View style={styles.container}>
            <TopMenuBar navigation={navigation} title={'Settings'} backButton={true} backOnPress={BackOnPress} />
            {(currentUser != null) && <UserLoggedInDisplay
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
            }
            {(currentUser != null) && <UsePersonailsedClubsToggle
                current={settings.customDistances}
                onValueChange={toggleCustomSwitch}
            />}
            <StatusBar style='light' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

export default SettingsScreen;