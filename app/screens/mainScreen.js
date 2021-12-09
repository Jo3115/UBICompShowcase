import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DistanceScreen from './distanceScreen';
import LogBookScreen from './logBookScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const MainScreen = (props) => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Tab.Screen name="Distance"
                component={DistanceScreen}
            />
            <Tab.Screen name="Log Book"
                component={LogBookScreen}
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