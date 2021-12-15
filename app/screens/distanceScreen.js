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
import Seperator from '../components/general/seperator';
import HoleSelectModal from '../components/holeSelect/holeSelectModal';
import { GetCourseOnline } from '../utilities/courses';

const metric = "yd"

const DistanceScreen = (props) => {
	const [currentHole, setCurrentHole] = useState(1)
	const [holeInfo, setHoleInfo] = useState(null)
	const [currentHoleInfo, setCurrentHoleInfo] = useState(null)
	const [locationLoading, setLocationLoading] = useState(true)
	const [currentLocation, setCurrentLocation] = useState(null)
	const [selectModalVisible, setSelectModalVisible] = useState(false);
	const [maxHoles, setMaxHoles] = useState(0);

	const getLocalCourseData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem(`course-${props.route.params.courseName}`)
			const courseInfo = (jsonValue != null ? JSON.parse(jsonValue) : null).cource
			setMaxHoles(courseInfo.length)
			setHoleInfo(courseInfo)
		} catch (e) {
			console.error(e)
		}
	}

	const getLocalOnlineCourseData = async () => {
		try {
			const response = await fetch(`https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse?name=${props.route.params.courseName}`);
			const jsonValue = await response.json();
			const courseInfo = jsonValue.cource
			setMaxHoles(courseInfo.length)
			setHoleInfo(courseInfo)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (props.route.params.downloaded == "downloaded") {
			getLocalCourseData()
		} else {
			getLocalOnlineCourseData()
		}
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
			<CloseButton onPress={() => props.navigation.pop()} />
			<HoleSelectModal currentHole={currentHole} maxHoles={maxHoles} modalVisible={selectModalVisible} setModalVisible={setSelectModalVisible} setHole={setCurrentHole} />
			<View style={styles.distanceContainer}>
				<DistanceCard target={"middle"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="large" />
				<View style={styles.cardRow}>
					<DistanceCard target={"front"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="left" />
					<DistanceCard target={"back"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="right" />
				</View>
			</View>
			<View style={styles.clubContainer}>
				<SuggestedClubDisplay target={"middle"} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={metric} type="large" />
			</View>
			<HoleSelectBar currentHole={currentHole} maxHoles={maxHoles} setHole={setCurrentHole} modalVisible={selectModalVisible} setModalVisible={setSelectModalVisible} />
			<Seperator height={50} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#e7eafb',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	cardRow: {
		flexDirection: 'row',
	},
	distanceContainer: {
		flex: 0.6,
		width: "95%",
		justifyContent: "center",
	},
	clubContainer: {
		flex: 0.4,
		width: "100%"
	},
});

export default DistanceScreen;