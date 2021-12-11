import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform, FlatList } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HoleSelectBar from '../components/holeSelect/holeSelectBar';
import DistanceCard from '../components/distanceScreen/distanceCard';
import LoadingIndicator from '../components/general/loadingIndicator';
import SuggestedClubDisplay from '../components/distanceScreen/suggestedClubDisplay';
import CloseButton from '../components/distanceScreen/closeButton';
import Position from 'react-native/Libraries/Components/Touchable/Position';
import { GetLocationOnce } from '../utilities/location';
import { CheckDownloaded, GetAllCourseByDistance } from '../utilities/courses';
import CourseListItem from '../components/courseScreen/courseListItem';
import { GetAllKeys } from '../utilities/asyncStorage';

const CourseScreen = ({ navigation }) => {
    const [locationLoading, setLocationLoading] = useState(true)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [coursesLoading, setCoursesLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [checkingDownloads, setCheckingDownloads] = useState(true)
    const [downloadedCourses, setDownloadedCourses] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([])


    const goToCourseOnPress = (item) => {
        navigation.push('DistanceScreen', {
            courseName: item
        })
    }

    useEffect(() => {
        if (locationLoading) {
            GetLocationOnce(setCurrentLocation, setLocationLoading)
        }
    })

    useEffect(() => {
        if (!locationLoading) {
            let locationLatLon = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
            GetAllCourseByDistance(locationLatLon, setCourses, setCoursesLoading)
        }
    }, [locationLoading])

    useEffect(() => {
        if (!coursesLoading) {
            GetAllKeys(setDownloadedCourses, setCheckingDownloads)
        }
    }, [coursesLoading])

    useEffect(() => {
        if (!checkingDownloads) {
            CheckDownloaded(courses, setFilteredCourses, downloadedCourses)
        }
    }, [checkingDownloads])

    if (locationLoading) {
        return <LoadingIndicator headding={"Getting Location"} />
    }
    if (coursesLoading) {
        return <LoadingIndicator headding={"Finding Courses"} />
    }
    if (checkingDownloads) {
        return <LoadingIndicator headding={"Finding Courses"} />
    }

    return (
        <View style={styles.screen}>
            <Text>Course Select</Text>
            <FlatList
                style={styles.list}
                data={filteredCourses}
                renderItem={({ item }) => (
                    <CourseListItem
                        name={item.name}
                        distance={item.distance}
                        downloaded={item.downloaded}
                        onPress={() => goToCourseOnPress(item.name)}
                    />
                )}
                keyExtractor={item => item.name}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: "100%",
        backgroundColor: '#e7eafb',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    list: {
        width: "100%"
    }
});

export default CourseScreen;