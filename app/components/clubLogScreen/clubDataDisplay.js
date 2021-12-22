import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useEffect, useState } from 'react/cjs/react.development';
import { SaveUserDistances } from '../../utilities/firebase';
import { GetUserDistances, SetDefault } from '../../utilities/suggestedClub';
import LoadingIndicator from '../general/loadingIndicator';
import Seperator from '../general/seperator';
import ClubDataDisplayHeader from './clubDataDisplayHeader';
import ClubDataDisplayListItem from './clubDataDisplayListItem';


const defaultDistances = true

const ClubDataDisplay = ({ currentUser }) => {
	const [userClubBounds, setUserClubBounds] = useState(null)
	const [clubsLoading, setClubsLoading] = useState(true)
	const [clubsList, setClubsList] = useState(null)
	const [clubSorting, setClubSorting] = useState(true)

	const GetClubData = async () => {
		setClubsLoading(true)
		if (currentUser != null) {
			await SaveUserDistances(currentUser.uid)
			await GetUserDistances(setUserClubBounds, setClubsLoading)
		} else {
			await GetUserDistances(setUserClubBounds, setClubsLoading)
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
	},[currentUser])
	useEffect(() => {
		SortClubData()
	}, [clubsLoading])

	if (clubsLoading || clubSorting) {
		return <LoadingIndicator headding={"Loading Club Data"} />
	}

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={clubsList}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => (
						<ClubDataDisplayListItem club={item.club} distance={item.distance} />
					)}
					renderSectionHeader={({ section: { title } }) => (
						<ClubDataDisplayHeader title={title} />
					)}
					ItemSeparatorComponent={() => <Seperator />}
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