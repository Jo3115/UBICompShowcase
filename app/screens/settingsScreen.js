import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { GetData, StoreJsonData } from '../utilities/asyncStorage';
import UserLoggedInDisplay from '../components/userInfo/userLoggedInDisplay';
import UsePersonailsedClubsToggle from '../components/settings/usePersonalisedClubsToggle';


const SettingsScreen = ({ navigation }) => {
    const [settings, setSettings] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    const GetCurrentUser = async () => {
        setCurrentUser(JSON.parse(await GetData("user")))
    }

    const BackOnPress = () => {
        navigation.pop()
    }

    const GetSettings = async () => {
        setSettings(JSON.parse(await GetData("settings")))
    }

    const toggleCustomSwitch = async () => {
        let changedSettings = settings
        changedSettings.customDistances = !settings.customDistances
        setSettings({ ...changedSettings })
        await StoreJsonData("settings", changedSettings)
    }

    useEffect(() => {
        GetSettings()
        GetCurrentUser()
    }, [])

    console.log(settings)

    return (
        <View style={styles.container}>
            <TopMenuBar navigation={navigation} title={"Settings"} backButton={true} backOnPress={BackOnPress} />
            {(currentUser != null) && <UserLoggedInDisplay
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
            }
            {(currentUser != null) && <UsePersonailsedClubsToggle
                current={settings.customDistances}
                onValueChange={toggleCustomSwitch}
            />}
            <StatusBar style="light" />
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