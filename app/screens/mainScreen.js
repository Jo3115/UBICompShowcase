import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DistanceScreen from './distanceScreen';
import ClubLogScreen from './clubLogScreen';
import CourseSelectScreen from './courseSelectScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { CheckKey, StoreJsonData } from '../utilities/asyncStorage';
import { DefaultSettings } from '../utilities/globalVars';
import { SaveDefaultDistances, SaveUserDistances } from '../utilities/firebase';
import LoadingIndicator from '../components/general/loadingIndicator';


const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
    const [firstLoad, setFirstLoad] = useState(true) 
    const FirstLoad = async () => {
        // if settings does not exist set initial settings
        let checkKey = await CheckKey("settings")
        StoreJsonData("settings", DefaultSettings)
        if (checkKey){
        }
        checkKey = await CheckKey("club-data")
        if (checkKey){
            SaveUserDistances("default")
            SaveDefaultDistances()
        }
        setFirstLoad(false)
    }

    useEffect(() => {
        FirstLoad()
	}, [])

    if (firstLoad) {
        return <LoadingIndicator headding={"Loading"} />
    }

    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: {
                        fontSize: 20
                    },
                    tabBarStyle: {
                        backgroundColor: '#694fad',
                        height: 60,
                        justifyContent: "center",
                    }
                }}
                initialRouteName="selectCourse"
            >
                <Tab.Screen name="selectCourse"
                    component={CourseSelectScreen}
                    options={{
                        tabBarLabel: 'Select Course',
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="golf-course" size={26} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="clubData"
                    component={ClubLogScreen}
                    options={{
                        tabBarLabel: 'Club Data',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="line-graph" size={26} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default MainScreen;