/**
 * @fileoverview this file represents a LoadingIndicator component, renders a spinning icon with text to display that the app is loading in the background
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

/**
 * LoadingIndicator, renders a spinning icon with text to display that the app is loading in the background
 * @param {string} headding - text to display on top of animated indicator
 */
const LoadingIndicator = ({ headding }) => {
	return (
		<View style={styles.container}>
            <Text style={styles.text}>{headding}</Text>
			<Progress.Circle size={100} borderWidth= {5} indeterminate={true} borderColor={'royalblue'}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eeeeee',
		alignItems: 'center',
		justifyContent: 'center',
	},
    text: {
        fontSize: 35,
        textAlign: 'center',
        paddingBottom: 40
    }
});

export default LoadingIndicator;