/**
 * @fileoverview this file represents the CourseSelectScreen screen renders a list of courses their distances as well as if they are downloaded or not.
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform, FlatList } from 'react-native';
import LoadingIndicator from '../components/general/loadingIndicator';
import { GetLocationOnce } from '../utilities/location';
import { CheckDownloaded, GetAllCourseByDistance } from '../utilities/courses';
import { GetAllKeys } from '../utilities/asyncStorage';
import Seperator from '../components/general/seperator';
import CourseListItem from '../components/courseSelectScreen/courseListItem';
import CourseListSearch from '../components/courseSelectScreen/courseListSearch';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { StatusBar } from 'expo-status-bar';

/**
 * MainScreen Screen, renders a list of courses their distances as well as if they are downloaded or not.
 * @param {object} navigation - navigation object passed from previous screen allows for navigating to different screens
 */
const CourseSelectScreen = ({ navigation }) => {
    const [locationLoading, setLocationLoading] = useState(true)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [coursesLoading, setCoursesLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [checkingDownloads, setCheckingDownloads] = useState(true)
    const [downloadedCourses, setDownloadedCourses] = useState([])
    const [courseList, setCourseList] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, onChangeSearchText] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState(null)

    /**
     * goToCourseOnPress, Function, Navigates to DistanceScreen with the relivant course information passed
     * @param {string} item - the course name
     * @param {boolean} downloaded - if the course is downloaded or not
     */
    const goToCourseOnPress = (item, downloaded) => {
        navigation.push('DistanceScreen', {
            courseName: item,
            downloaded: downloaded
        })
    }

    /**
     * filterCourses, Function, filters the course information bassed on text string
     */
    const filterCourses = () => {
        if (searchText == null) {
            setFilteredCourses(courseList)
        } else {
            const regexp = new RegExp(searchText, 'i');
            setFilteredCourses(courseList.filter(x => regexp.test(x.name)))
        }
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
            CheckDownloaded(courses, setCourseList, downloadedCourses)
            setRefreshing(false)
        }
    }, [checkingDownloads])

    useEffect(() => {
        filterCourses()
    }, [courseList, searchText])

    if (locationLoading && !refreshing) {
        return <LoadingIndicator headding={'Getting Location'} />
    }
    if (coursesLoading && !refreshing) {
        return <LoadingIndicator headding={'Finding Courses'} />
    }
    if (checkingDownloads && !refreshing) {
        return <LoadingIndicator headding={'Finding Courses'} />
    }

    return (
        <View style={styles.screen}>
            <TopMenuBar navigation={navigation} title={'Select Course'} settingsButton={true} />
            <FlatList
                ListHeaderComponent={<CourseListSearch searchText={searchText} onChangeSearchText={onChangeSearchText} />}
                style={styles.list}
                data={filteredCourses}
                ItemSeparatorComponent={Seperator}
                renderItem={({ item }) => (
                    <CourseListItem
                        name={item.name}
                        distance={item.distance}
                        downloaded={item.downloaded}
                        onPress={() => goToCourseOnPress(item.name, item.downloaded)}
                    />
                )}
                keyExtractor={item => item.name}
                refreshing={refreshing}
                onRefresh={() => {
                    setLocationLoading(true)
                    setCoursesLoading(true)
                    setCheckingDownloads(true)
                    setRefreshing(true)
                }}
            />
            <StatusBar style='light' />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    list: {
        width: '100%'
    }
});

export default CourseSelectScreen;