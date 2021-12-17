import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DistanceScreen from './distanceScreen';
import ClubLogScreen from './clubLogScreen';
import CourseSelectScreen from './courseSelectScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { CheckKey, StoreJsonData } from '../utilities/asyncStorage';
import { useEffect } from 'react/cjs/react.development';
import { DefaultSettings } from '../utilities/globalVars';


const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
    const FirstLogIn = async () => {
        // if settings does not exist set initial settings
        let checkKey = await CheckKey("settings")
        if (checkKey){
            StoreJsonData("settings", DefaultSettings)
        }
	}

    useEffect(() => {
        FirstLogIn()
	}, [])

    return (
        <View style={styles.container}>
            <TopMenuBar navigation={navigation} title={"Select Course"} settingsButton={true} />
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