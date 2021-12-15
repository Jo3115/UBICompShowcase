/**
 * @fileoverview this file represents a HoleSelect component, renders a component displaying current hole and allowing the user to navigate to a given hole.
 */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import HoleSelectTextSelect from './holeSelectTextSelect';
import HoleSelectModal from './holeSelectModal';
import { useState } from 'react/cjs/react.development';

/**
 * ForcastListItem, renders a list item for the spotForcast list containing a ForcastListItemExpanded which is revield when pressed
 */
const HoleSelectBar = ({ currentHole, maxHoles, setHole, modalVisible, setModalVisible }) => {
	return (
		<View style={styles.holeSelectBarContainer}>
			{currentHole > 1
				? <TouchableHighlight
					style={styles.icon}
					activeOpacity={0.6}
					underlayColor='#DDDDDD'
					onPress={() => setHole(currentHole - 1)}>
					<AntDesign name="left" size={30} color="white" />
				</TouchableHighlight>
				: <View style={styles.icon}>
					<AntDesign name="left" size={30} color="#694fad" />
				</View>
			}
			<View style={styles.holeTextContainer}>
				<HoleSelectTextSelect currentHole={currentHole} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
			</View>
			{currentHole < maxHoles
				? <TouchableHighlight
					style={styles.icon}
					activeOpacity={0.6}
					underlayColor='#DDDDDD'
					onPress={() => setHole(currentHole + 1)}>
					<AntDesign name="right" size={30} color="white" />
				</TouchableHighlight>
				: <View style={styles.icon}>
					<AntDesign name="right" size={30} color="#694fad" />
				</View>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	holeSelectBarContainer: {
		width: "100%",
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: "#694fad",
		position: 'absolute',
        zIndex: 100,
        elevation: 100,
		bottom: 0
	},
	icon: {
		width: 50,
		height: "100%",
		justifyContent: 'center',
		alignItems: 'center'
	},
	holeTextContainer: {
		height: "100%",
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default HoleSelectBar;