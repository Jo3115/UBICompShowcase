/**
 * @fileoverview this file represents a ClubDataDisplay component, renders a section list of ClubDataDisplayListItem seperated by ClubDataDisplayHeader for given clubs
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetData } from '../../utilities/asyncStorage';
import { SaveUserDistances } from '../../utilities/firebase';
import { GetDefaultDistances, GetUserDistances } from '../../utilities/suggestedClub';
import ClubDataDisplayHeader from './clubDataDisplayHeader';
import ClubDataDisplayListItem from './clubDataDisplayListItem';
import ClubDataEmptyMesage from './clubDataEmptyMesage';

/**
 * ClubDataDisplay, renders a section list of ClubDataDisplayListItem seperated by ClubDataDisplayHeader for given clubs
 * @param {object} currentUser - object containg current user information
 * @param {boolean} useCustom - boolean determining if using custom club data
 * @param {boolean} addClubModalVisible - boolean determining if the addClubModal is visible
 * @param {Function} setAddClubModalVisible - function to set the addClubModal visible value
 * @param {number} reload - boolean telling the component to reload
 */
const ClubDataDisplay = ({ currentUser, useCustom, addClubModalVisible, setAddClubModalVisible, reload }) => {
	const [userClubBounds, setUserClubBounds] = useState(null)
	const [clubsLoading, setClubsLoading] = useState(true)
	const [clubsList, setClubsList] = useState(null)
	const [clubSorting, setClubSorting] = useState(true)
	const [settings, setSettings] = useState(null)


	/**
	 * getUserID, Function, return current user id if avalible
	 * @returns {string} - user id or empty string
	 */
	const getUserID = () => {
		if (currentUser != null) {
			return currentUser.uid
		}
		return ''
	}
	/**
	 * GetSettings, Function, gets the current settings from async storage
	 */
	const GetSettings = async () => {
		setSettings(JSON.parse(await GetData('settings')))
	}

	/**
	 * GetClubData, Function, get club data from storage 
	 */
	const GetClubData = async () => {
		setClubsLoading(true)
		if (currentUser != null && useCustom) {
			await SaveUserDistances(currentUser.uid)
			await GetUserDistances(setUserClubBounds, setClubsLoading)
		} else {
			await GetDefaultDistances(setUserClubBounds, setClubsLoading)
		}
	}

	/**
	 * SortClubData, Function, sort club data into appropriate catagories 
	 */
	const SortClubData = async () => {
		if (!clubsLoading) {
			let outObjectList = {}
			for (let key in userClubBounds) {
				let catagory = userClubBounds[key].split(' ')[1]
				if (outObjectList[catagory] == null) {
					outObjectList[catagory] = []
				}
				if (userClubBounds[key] == 'Driver') {
					catagory = 'Wood'
				}
				outObjectList[catagory].push({
					distance: key,
					club: userClubBounds[key]
				})
			}

			let outList = []
			for (let key in outObjectList) {
				if (!(outObjectList[key].length == 0)) {
					outList.push({
						title: key,
						data: outObjectList[key]
					})
				}
			}
			setClubsList(outList)
			setClubSorting(false)
		}
	}

	useEffect(() => {
		GetSettings()
		GetClubData()
	}, [currentUser, useCustom, reload])
	useEffect(() => {
		SortClubData()
	}, [clubsLoading])

	// message to display if club list is empty
	if (clubsList != null) {
		if (Object.keys(clubsList).length == 0) {
			return (
				<ClubDataEmptyMesage modal={addClubModalVisible} setModal={setAddClubModalVisible} />
			)
		}
	}
	console.log(settings)
	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={clubsList}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => (
						<ClubDataDisplayListItem club={item.club} distance={item.distance} custom={useCustom} userID={getUserID()} getClubData={GetClubData} metric={settings.metric}/>
					)}
					renderSectionHeader={({ section: { title } }) => (
						<ClubDataDisplayHeader title={title} custom={useCustom} currentUser={currentUser} modal={addClubModalVisible} setModal={setAddClubModalVisible} />
					)}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
	},
});

export default ClubDataDisplay;