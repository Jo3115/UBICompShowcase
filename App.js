/**
 * @fileoverview This component is the main app entrypoint, it does not render anything but sets up the routes for the navigation and loads the first page (MainScreen).
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import DistanceScreen from './app/screens/distanceScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './app/screens/mainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from './app/screens/settingsScreen';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Root = createStackNavigator();

export default function App() {
	AsyncStorage.clear()
	// Suppress log output as Known error and correct package is being used more info at https://react-native-async-storage.github.io/async-storage/
	LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);
	// Suppress log output as Known error and schema is configured correctly in app.json
	LogBox.ignoreLogs(["Linking requires a build-time setting `scheme` in the project's Expo config"]);
	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer>
				<Root.Navigator>
					<Root.Screen
						name='MainScreen'
						component={MainScreen}
						options={{ headerShown: false }}
					/>
					<Root.Screen
						name='SettingsScreen'
						component={SettingsScreen}
						options={{ headerShown: false }}
					/>
					<Root.Screen
						name='DistanceScreen'
						component={DistanceScreen}
						options={{ headerShown: false }}
					/>
				</Root.Navigator>
			</NavigationContainer >
			<StatusBar style='light' />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#694fad'
	},
});
