import { StatusBar } from 'expo-status-bar';
import { reload } from 'firebase/auth';
import React from 'react';
import { StyleSheet, Text, View, Button, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useEffect, useState } from 'react/cjs/react.development';
import { SaveUserDistances } from '../../utilities/firebase';
import { GetDefaultDistances, GetUserDistances, SetDefault } from '../../utilities/suggestedClub';
import LoadingIndicator from '../general/loadingIndicator';
import AddClubModal from './addClubModal';
import ClubDataDisplayHeader from './clubDataDisplayHeader';
import ClubDataDisplayListItem from './clubDataDisplayListItem';
import ClubDataEmptyMesage from './clubDataEmptyMesage';

const ClubDataDisplay = ({ currentUser, useCustom, addClubModalVisible, setAddClubModalVisible, reload }) => {
	const [userClubBounds, setUserClubBounds] = useState(null)
	const [clubsLoading, setClubsLoading] = useState(true)
	const [clubsList, setClubsList] = useState(null)
	const [clubSorting, setClubSorting] = useState(true)

	const getUserID = () => {
		if (currentUser != null) {
			return currentUser.uid
		}
		return ""
	}

	const GetClubData = async () => {
		setClubsLoading(true)
		if (currentUser != null && useCustom) {
			await SaveUserDistances(currentUser.uid)
			await GetUserDistances(setUserClubBounds, setClubsLoading)
		} else {
			await GetDefaultDistances(setUserClubBounds, setClubsLoading)
		}
	}

	const SortClubData = async () => {
		if (!clubsLoading) {
			let outObjectList = {}
			for (let key in userClubBounds) {
				let catagory = userClubBounds[key].split(" ")[1]
				if (outObjectList[catagory] == null) {
					outObjectList[catagory] = []
				}
				if (userClubBounds[key] == "Driver") {
					catagory = "Wood"
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
		GetClubData()
	}, [currentUser, useCustom, reload])
	useEffect(() => {
		SortClubData()
	}, [clubsLoading])

	
	if (Object.keys(clubsList).length == 0) {
		return (
			<ClubDataEmptyMesage modal={addClubModalVisible} setModal={setAddClubModalVisible} />
		)
	}
	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={clubsList}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => (
						<ClubDataDisplayListItem club={item.club} distance={item.distance} custom={useCustom} userID={getUserID()} getClubData={GetClubData} />
					)}
					renderSectionHeader={({ section: { title } }) => (
						<ClubDataDisplayHeader title={title} custom={useCustom} modal={addClubModalVisible} setModal={setAddClubModalVisible} />
					)}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
});

export default ClubDataDisplay;