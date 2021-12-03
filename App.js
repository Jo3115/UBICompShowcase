import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DistanceScreen from './app/screens/distanceScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './app/screens/loginScreen';
import MainScreen from './app/screens/mainScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Root = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Root.Navigator>
			<Root.Screen
				name='LoginScreen'
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<Root.Screen
				name='MainScreen'
				component={MainScreen}
				options={({ route }) => ({
					title: route.params.name,
					headerShown: false,
				})}
			/>
		</Root.Navigator>
		</NavigationContainer >
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
