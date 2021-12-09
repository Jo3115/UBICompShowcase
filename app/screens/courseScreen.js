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
import { GetAllCourseByDistance } from '../utilities/courses';

const CourseScreen = ({navigation}) => {
    const [locationLoading, setLocationLoading] = useState(true)
	const [currentLocation, setCurrentLocation] = useState(null)
    
	useEffect(() => {
		GetLocation(setCurrentLocation, setLocationLoading)
	}, [])

	if (locationLoading) {
		return <LoadingIndicator headding={"loading"} />
	}

    const [coursesLoading, setCoursesLoading] = useState(true)
    const [courses, setCourses] = useState([])

    let locationLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }

    useEffect(() => {
		GetAllCourseByDistance(locationLatLon, setCourses, setCoursesLoading)
	}, [locationLoading])

	return (
		<View style={styles.screen}>
			<Text>DISPLAY COURSES HERE</Text>
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

export default CourseScreen;