import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as Location from 'expo-location';
import { ScrollView } from 'react-native-gesture-handler';
import HoleSelectBar from '../components/holeSelect/holeSelectBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DistanceCard from '../components/distanceScreen/distanceCard';

const metric = "yd"

const DistanceScreen = (props) => {
	const [currentHole, setCurrentHole] = useState(1)
	const [holeInfo, setHoleInfo] = useState(null)
	const [currentHoleInfo, setCurrentHoleInfo] = useState(null)
	const [currentLocation, setCurrentLocation] = useState(null)

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('@current_course')
			setHoleInfo((jsonValue != null ? JSON.parse(jsonValue) : null).cource)
		} catch (e) {
			// error reading value
		}
	}

	const getLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			return;
		}
		let location = await Location.watchPositionAsync(
			{
				distanceInterval: 1,
				accuracy: Location.Accuracy.High,
			},
			(loc) => {
				let locationStr = JSON.stringify(loc);
				setCurrentLocation(JSON.parse(locationStr))
			}

		)
	}

	useEffect(() => {
		getData()
		getLocation()
	}, [])

	useEffect(() => {
		if (holeInfo !== null) {
			setCurrentHoleInfo(holeInfo[currentHole - 1])
		}
	}, [currentHole, holeInfo])
	return (
		<View style={styles.container}>
			<View style={styles.distanceContainer}>
				<HoleSelectBar currentHole={currentHole} maxHoles={9} setHole={setCurrentHole} />
				<DistanceCard target={"middle"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="large" />
				<View style={styles.cardRow}>
					<DistanceCard target={"front"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="small" />
					<DistanceCard target={"back"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="small" />
				</View>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	cardRow: {
		flexDirection: 'row',
	},
	distanceContainer: {
		flex: 0.5,
		width: "100%"
	},
});

export default DistanceScreen;