/**
 * @fileoverview this file represents the DistanceScreen screen renders distance cards containg distance from current hole, club suggestion and hole select bar.
 */
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import HoleSelectBar from '../components/holeSelect/holeSelectBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DistanceCard from '../components/distanceScreen/distanceCard';
import LoadingIndicator from '../components/general/loadingIndicator';
import SuggestedClubDisplay from '../components/distanceScreen/suggestedClubDisplay';
import CloseButton from '../components/distanceScreen/closeButton';
import { CleanupLocation, GetLocation } from '../utilities/location';
import Seperator from '../components/general/seperator';
import HoleSelectModal from '../components/holeSelect/holeSelectModal';
import { DefaultSettings } from '../utilities/globalVars';
import { GetData, StoreJsonData } from '../utilities/asyncStorage';
import SwapTargetButton from '../components/distanceScreen/swapTargetButton';

/**
 * DistanceScreen Screen, renders distance cards containg distance from current hole, club suggestion and hole select bar.
 * @param {object} props - stores data passed from parent component
 */
const DistanceScreen = (props) => {
	const [currentHole, setCurrentHole] = useState(1)
	const [holeInfo, setHoleInfo] = useState(null)
	const [currentHoleInfo, setCurrentHoleInfo] = useState(null)
	const [locationLoading, setLocationLoading] = useState(true)
	const [currentLocation, setCurrentLocation] = useState(null)
	const [selectModalVisible, setSelectModalVisible] = useState(false);
	const [maxHoles, setMaxHoles] = useState(0)
	const [settings, setSettings] = useState(DefaultSettings)

	let locationSubscription = null
	let getLocalCourseDataSubscription = null
	let getLocalOnlineCourseDataSubscription = null

	const targetLayout = {
		middle: {
			large: 'middle',
			left: 'front',
			right: 'back'
		},
		front: {
			large: 'front',
			left: 'middle',
			right: 'back'
		},
		back: {
			large: 'back',
			left: 'front',
			right: 'middle'
		}
	}

	/**
	 * getLocalCourseData, Function, get the course data from local storage if course is downloaded
	 */
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

	/**
	 * getLocalOnlineCourseData, Function, get the course data from api storage if course is not downloaded
	 */
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
	/**
	 * GetSettings, Function, get settings from local storage
	 */
	const GetSettings = async () => {
		setSettings(JSON.parse(await GetData('settings')))
	}
	/**
	 * getTarget, Function, work out order distance cards bassed on target
	 */
	const getTarget = (type) => {
		if (settings.target == null) {
			return targetLayout['middle'][type]
		} else {
			return targetLayout[settings.target][type]
		}
	}
	const swapTargetOnpress = () => {
		if (settings != null) {
			let changedSettings = settings
			if (settings.target == 'middle') {
				changedSettings.target = 'front'
			} else if (settings.target == 'front') {
				changedSettings.target = 'back'
			} else {
				changedSettings.target = 'middle'
			}
			setSettings({ ...changedSettings })
			StoreJsonData('settings', changedSettings)
		}
	}

	useEffect(() => {
		if (props.route.params.downloaded == 'downloaded') {
			getLocalCourseDataSubscription = getLocalCourseData()
		} else {
			getLocalOnlineCourseDataSubscription = getLocalOnlineCourseData()
		}
		locationSubscription = GetLocation(setCurrentLocation, setLocationLoading)
		GetSettings()
		return function cleanup() {
			locationSubscription.remove
			getLocalCourseDataSubscription.remove
			getLocalOnlineCourseDataSubscription.remove
		}
	}, [])

	useEffect(() => {
		if (holeInfo !== null) {
			setCurrentHoleInfo(holeInfo[currentHole - 1])
		}
	}, [currentHole, holeInfo])

	if (currentLocation === null || currentHoleInfo === null) {
		return <LoadingIndicator headding={'Loading'} />
	}

	return (
		<View style={styles.screen}>
			<CloseButton onPress={() => props.navigation.pop()} />
			<SwapTargetButton onPress={() => swapTargetOnpress()}/>
			<HoleSelectModal currentHole={currentHole} maxHoles={maxHoles} modalVisible={selectModalVisible} setModalVisible={setSelectModalVisible} setHole={setCurrentHole} />
			<View style={styles.distanceContainer}>
				<DistanceCard target={getTarget('large')} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={settings.metric} type='large' />
				<View style={styles.cardRow}>
					<DistanceCard target={getTarget('left')} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={settings.metric} type='left' />
					<DistanceCard target={getTarget("right")} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={settings.metric} type='right' />
				</View>
			</View>
			<View style={styles.clubContainer}>
				<SuggestedClubDisplay target={getTarget('large')} currentLocation={currentLocation} targetLocation={currentHoleInfo} metric={settings.metric} type='large' />
			</View>
			<HoleSelectBar currentHole={currentHole} maxHoles={maxHoles} setHole={setCurrentHole} modalVisible={selectModalVisible} setModalVisible={setSelectModalVisible} />
			<Seperator height={50} />
			<StatusBar style='light' />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#eeeeee',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	cardRow: {
		flexDirection: 'row',
	},
	distanceContainer: {
		flex: 0.6,
		width: '100%',
		padding: 10,
		justifyContent: 'center',
	},
	clubContainer: {
		flex: 0.4,
		width: '100%'
	},
});

export default DistanceScreen;