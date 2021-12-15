import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform, FlatList } from 'react-native';
import LoadingIndicator from '../components/general/loadingIndicator';
import { GetLocationOnce } from '../utilities/location';
import { CheckDownloaded, GetAllCourseByDistance } from '../utilities/courses';
import { GetAllKeys } from '../utilities/asyncStorage';
import Seperator from '../components/general/seperator';
import CourseListItem from '../components/courseSelectScreen/courseListItem';
import CourseListSearch from '../components/courseSelectScreen/courseListSearch';


const CourseSelectScreen = ({ navigation }) => {
    const [locationLoading, setLocationLoading] = useState(true)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [coursesLoading, setCoursesLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [checkingDownloads, setCheckingDownloads] = useState(true)
    const [downloadedCourses, setDownloadedCourses] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, onChangeSearchText] = useState(null);




    const goToCourseOnPress = (item, downloaded) => {
        navigation.push('DistanceScreen', {
            courseName: item,
            downloaded: downloaded
        })
    }

    const filterCourses = () => {
        
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
            setRefreshing(false)
        }
    }, [checkingDownloads])

    useEffect(() => {
        if (!checkingDownloads) {
            
        }
    }, [searchText])

    if (locationLoading && !refreshing) {
        return <LoadingIndicator headding={"Getting Location"} />
    }
    if (coursesLoading && !refreshing) {
        return <LoadingIndicator headding={"Finding Courses"} />
    }
    if (checkingDownloads && !refreshing) {
        return <LoadingIndicator headding={"Finding Courses"} />
    }

    return (
        <View style={styles.screen}>
            <Text>Course Select</Text>
            <FlatList
                ListHeaderComponent={<CourseListSearch searchText={searchText} onChangeSearchText={onChangeSearchText}/>}
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

export default CourseSelectScreen;