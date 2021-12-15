import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DistanceScreen from './distanceScreen';
import ClubLogScreen from './clubLogScreen';
import CourseSelectScreen from './courseSelectScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

const MainScreen = (props) => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="selectCourse"
            barStyle={{
                backgroundColor: '#694fad',
                height: 60,
                justifyContent: "center",
            }}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MainScreen;