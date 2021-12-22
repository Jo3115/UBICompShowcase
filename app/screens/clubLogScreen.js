import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { useEffect, useState } from 'react/cjs/react.development';
import UserNotLoggedInDisplay from '../components/userInfo/userNotLoggedInDisplay';
import { GetData } from '../utilities/asyncStorage';
import { GetUserDistances } from '../utilities/suggestedClub';
import { SaveUserDistances } from '../utilities/firebase';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ClubLogScreen = ({ navigation }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [currentUserLoading, setCurrentUserLoading] = useState(true)
	const [userClubBounds, setUserClubBounds] = useState(null)
	const [defaultClubData, setDefaulClubData] = useState(null)
	const [clubsLoading, setClubsLoading] = useState(true)

	const GetCurrentUser = async () => {
		setCurrentUser(JSON.parse(await GetData("user")))
		setCurrentUserLoading(false)
	}

	const GetClubData = async () => {
		if (currentUser != null) {
			await SaveUserDistances(currentUser.uid)
			await GetUserDistances(setUserClubBounds, setClubsLoading)
		} else {
			
		}
		console.log(userClubBounds)
		setDefaulClubData(JSON.parse(await GetData("default-club-data")))
	}

	useFocusEffect(() => {
		GetCurrentUser()
	})
	useEffect(() => {
		GetClubData()
	}, [currentUserLoading])


	return (
		<View style={styles.container}>
			<TopMenuBar navigation={navigation} title={"Club Data"} settingsButton={true} />
			{(currentUser == null) && <UserNotLoggedInDisplay setCurrentUser={setCurrentUser} />}
			{(currentUser == null) && <Text>Using Default distances</Text>}
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

export default ClubLogScreen;