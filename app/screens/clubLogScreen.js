import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { useEffect, useState } from 'react/cjs/react.development';
import UserNotLoggedInDisplay from '../components/userInfo/userNotLoggedInDisplay';
import { GetData, StoreJsonData } from '../utilities/asyncStorage';
import { GetUserDistances, SetDefault } from '../utilities/suggestedClub';
import { SaveUserDistances } from '../utilities/firebase';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClubDataDisplay from '../components/clubLogScreen/clubDataDisplay';
import UsePersonailsedClubsToggle from '../components/settings/usePersonalisedClubsToggle';



const ClubLogScreen = ({ navigation }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [settings, setSettings] = useState({})

	const GetCurrentUser = async () => {
		let gotUser = JSON.parse(await GetData("user"))
		if (gotUser != null) {
			if (currentUser != null) {
				if (gotUser.uid != currentUser.uid) {
					setCurrentUser(gotUser)
				}
			} else {
				setCurrentUser(gotUser)
			}
		} else {
			if ((currentUser != gotUser)) {
				setCurrentUser(null)
			}
		}
	}
	const GetSettings = async () => {
		let gotSettings = JSON.parse(await GetData("settings"))
		if (gotSettings != null) {
			if (gotSettings.metric != settings.metric) {
				setSettings({ ...gotSettings })
			}
		}
	}
	const toggleCustomSwitch = async () => {
		let changedSettings = settings
		changedSettings.customDistances = !settings.customDistances
		setSettings({ ...changedSettings })
		await StoreJsonData("settings", changedSettings)
	}
	// run when returning to screen from settings
	useFocusEffect(() => {
		GetCurrentUser()
		GetSettings()
	})

	return (
		<View style={styles.container}>
			<TopMenuBar navigation={navigation} title={"Club Data"} settingsButton={true} />
			{(currentUser == null) && <UserNotLoggedInDisplay setCurrentUser={setCurrentUser} />}
			{(currentUser != null) && <UsePersonailsedClubsToggle current={settings.customDistances} onValueChange={toggleCustomSwitch} />}
			<ClubDataDisplay currentUser={currentUser} useCustom={settings.customDistances} />
			<StatusBar style="light" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eeeeee',
		alignItems: 'center',
	},
});

export default ClubLogScreen;