import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DistanceScreen from './app/screens/distanceScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './app/screens/loginScreen';
import MainScreen from './app/screens/mainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import CourseSelectScreen from './app/screens/courseSelectScreen';

const Root = createStackNavigator();

export default function App() {
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
						name='CourseSelectScreen'
						component={CourseSelectScreen}
						options={({ route }) => ({
							headerShown: false,
						})}
					/>
					<Root.Screen
						name='DistanceScreen'
						component={DistanceScreen}
						options={({ route }) => ({
							headerShown: false,
						})}
					/>
				</Root.Navigator>
			</NavigationContainer >
			<StatusBar style="light" />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: "#694fad"
	  },
});
