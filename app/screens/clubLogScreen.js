import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { useEffect, useState } from 'react/cjs/react.development';
import UserNotLoggedInDisplay from '../components/userInfo/userNotLoggedInDisplay';
import { GetData } from '../utilities/asyncStorage';
import { GetUserDistances, SetDefault } from '../utilities/suggestedClub';
import { SaveUserDistances } from '../utilities/firebase';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClubDataDisplay from '../components/clubLogScreen/clubDataDisplay';



const ClubLogScreen = ({ navigation }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [currentUserLoading, setCurrentUserLoading] = useState(true)

	const GetCurrentUser = async () => {
		let gotUser = JSON.parse(await GetData("user"))
		if (gotUser != null) {
			if  (gotUser.uid != currentUser.uid) {
				setCurrentUser(gotUser)
			}
		} else {
			if ((currentUser != gotUser)) {
				console.log("here")
				setCurrentUser(null)
			}
		}
	}
	useFocusEffect(() => {
		GetCurrentUser()
	})

	console.log(currentUser)

	return (
		<View style={styles.container}>
			<TopMenuBar navigation={navigation} title={"Club Data"} settingsButton={true} />
			{(currentUser == null) && <UserNotLoggedInDisplay setCurrentUser={setCurrentUser} />}
			<ClubDataDisplay currentUser={currentUser} />
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