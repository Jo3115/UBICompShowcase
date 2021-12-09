import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DistanceScreen from './app/screens/distanceScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './app/screens/loginScreen';
import MainScreen from './app/screens/mainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import CourseScreen from './app/screens/courseScreen';

const Root = createStackNavigator();

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer>
				<Root.Navigator>
					<Root.Screen
						name='LoginScreen'
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Root.Screen
						name='CourseSelectScreen'
						component={CourseScreen}
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
			<StatusBar style="auto" />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ECF0F1'
	  },
});
