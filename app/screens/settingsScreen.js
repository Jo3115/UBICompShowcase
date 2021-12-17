import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TopMenuBar from '../components/topMenu/topMenuBar';
import UserInfoDisplay from '../components/userInfo/userInfoDisplay';
import { useEffect, useState } from 'react/cjs/react.development';
import { GetData } from '../utilities/asyncStorage';


const SettingsScreen = ({ navigation }) => {
    const [settings, setSettings] = useState(null)

    const BackOnPress = () => {
        navigation.pop()
    }

    const GetSettings = async () => {
        setSettings(JSON.parse(await GetData("settings")))
    }

    useEffect(() => {
        GetSettings()
    }, [])

    console.log(settings)

    return (
        <View style={styles.container}>
            <TopMenuBar navigation={navigation} title={"Settings"} backButton={true} backOnPress={BackOnPress} />
            <UserInfoDisplay />

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