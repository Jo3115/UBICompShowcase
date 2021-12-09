import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HoleSelectBar from '../components/holeSelect/holeSelectBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DistanceCard from '../components/distanceScreen/distanceCard';
import LoadingIndicator from '../components/general/loadingIndicator';
import SuggestedClubDisplay from '../components/distanceScreen/suggestedClubDisplay';
import CloseButton from '../components/distanceScreen/closeButton';
import Position from 'react-native/Libraries/Components/Touchable/Position';
import { GetLocation } from '../utilities/location';

const metric = "yd"

const DistanceScreen = ({navigation}) => {
	const [currentHole, setCurrentHole] = useState(1)
	const [holeInfo, setHoleInfo] = useState(null)
	const [currentHoleInfo, setCurrentHoleInfo] = useState(null)
	const [locationLoading, setLocationLoading] = useState(true)
	const [currentLocation, setCurrentLocation] = useState(null)

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('@current_course')
			setHoleInfo((jsonValue != null ? JSON.parse(jsonValue) : null).cource)
		} catch (e) {
			// error reading value
		}
	}

	useEffect(() => {
		getData()
		GetLocation(setCurrentLocation, setLocationLoading)
	}, [])

	useEffect(() => {
		if (holeInfo !== null) {
			setCurrentHoleInfo(holeInfo[currentHole - 1])
		}
	}, [currentHole, holeInfo])

	if (currentLocation === null || currentHoleInfo === null) {
		return <LoadingIndicator headding={"loading"} />
	}

	return (
		<View style={styles.screen}>
			<CloseButton onPress={() => navigation.pop()}/>
			<View style={styles.distanceContainer}>
				<DistanceCard target={"middle"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="large" />
				<View style={styles.cardRow}>
					<DistanceCard target={"front"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="small" />
					<DistanceCard target={"back"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="small" />
				</View>
			</View>
			<View style={styles.clubContainer}>
				<SuggestedClubDisplay target={"middle"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="large" />
			</View>
			<HoleSelectBar currentHole={currentHole} maxHoles={9} setHole={setCurrentHole} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	cardRow: {
		flexDirection: 'row',
	},
	distanceContainer: {
		flex: 0.6,
		width: "100%"
	},
	clubContainer: {
		flex: 0.4,
		width: "100%"
	},
});

export default DistanceScreen;