/**
 * @fileoverview this file represents the ClubLogScreen screen renders a list of club data pulled from local storage or firebase.
 * Also displays the log in compoent if the user is not logged in
 */
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TopMenuBar from '../components/topMenu/topMenuBar';
import UserNotLoggedInDisplay from '../components/userInfo/userNotLoggedInDisplay';
import { GetData, StoreJsonData } from '../utilities/asyncStorage';
import { useFocusEffect } from '@react-navigation/native';
import ClubDataDisplay from '../components/clubLogScreen/clubDataDisplay';
import UsePersonailsedClubsToggle from '../components/settings/usePersonalisedClubsToggle';
import AddClubModal from '../components/clubLogScreen/addClubModal';
import EditClubModal from '../components/clubLogScreen/editClubModal';
import ClubLogWarningModal from '../components/clubLogScreen/clubLogWarningModal';

/**
 * MainScreen Screen, renders a list of club data pulled from local storage or firebase and displays the log in compoent if the user is not logged in or the UsePersonailsedClubsToggle if they are
 * @param {object} navigation - navigation object passed from previous screen allows for navigating to different screens
 */
const ClubLogScreen = ({ navigation }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [settings, setSettings] = useState({})
	const [addClubModalVisible, setAddClubModalVisible] = useState(false)
	const [reload, setReload] = useState(0)
	const [clubToEdit, setClubToEdit] = useState('')
	const [distanceToEdit, setDistanceToEdit] = useState('0')
	const [distanceToEditMetric, setDistanceToEditMetric] = useState('m')
	const [editClubModal, setEditClubModal] = useState(false)

	/**
     * GetCurrentUser, Function, gets the current logged in user if avalible from async storage
     */
	const GetCurrentUser = async () => {
		let gotUser = JSON.parse(await GetData('user'))
		if (gotUser != null) {
			if (currentUser != null) {
				if (gotUser.uid != currentUser.uid) {
					setCurrentUser(gotUser)
				}
			} else {
				setCurrentUser(gotUser)
			}
		} else {
			if ((currentUser != gotUser)) {
				setCurrentUser(null)
			}
		}
	}
	/**
     * GetCurrentUser, Function, gets the current settings from async storage
     */
	const GetSettings = async () => {
		let gotSettings = JSON.parse(await GetData('settings'))
		if (gotSettings != null) {
			if (gotSettings.metric != settings.metric) {
				setSettings({ ...gotSettings })
				setReload(reload + 1)
			}
		}
	}
	/**
     * toggleCustomSwitch, Function, toggles wether to use custom distances or not
     */
	const toggleCustomSwitch = async () => {
		let changedSettings = settings
		changedSettings.customDistances = !settings.customDistances
		setSettings({ ...changedSettings })
		await StoreJsonData('settings', changedSettings)
	}
	/**
     * showEditClubModal, Function, shows the showEditClubModal
     */
	 const showEditClubModal = (clubName, distance, metric) => {
		setClubToEdit(clubName)
		setDistanceToEdit(distance)
		setDistanceToEditMetric(metric)
		setEditClubModal(true)
	}
	// run when returning to screen from settings
	useFocusEffect(useCallback( ()=> {
		GetCurrentUser()
		GetSettings()
	}))

	return (
		<View style={styles.container}>
			{(currentUser != null && settings.customDistances) && <AddClubModal
				modalVisible={addClubModalVisible}
				setModalVisible={setAddClubModalVisible}
				userID={currentUser.uid}
				reload={reload}
				setReload={setReload}
			/>}
			{(currentUser != null && settings.customDistances) && <EditClubModal
				modalVisible={editClubModal}
				setModalVisible={setEditClubModal}
				userID={currentUser.uid}
				reload={reload}
				setReload={setReload}
				club={clubToEdit}
				startingDistance={distanceToEdit}
				startingMetric={distanceToEditMetric}
			/>}
			{(currentUser == null||!settings.customDistances) && <ClubLogWarningModal
				modalVisible={editClubModal}
				setModalVisible={setEditClubModal}
			/>}
			<TopMenuBar navigation={navigation} title={'Club Data'} settingsButton={true} />
			{(currentUser == null) && <UserNotLoggedInDisplay setCurrentUser={setCurrentUser} />}
			{(currentUser != null) && <UsePersonailsedClubsToggle
				current={settings.customDistances}
				onValueChange={toggleCustomSwitch}
			/>}
			<ClubDataDisplay
				currentUser={currentUser}
				useCustom={settings.customDistances}
				addClubModalVisible={addClubModalVisible}
				setAddClubModalVisible={setAddClubModalVisible}
				reload={reload}
				showEditClubModal={showEditClubModal}
			/>
			<StatusBar style='light' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eeeeee',
		alignItems: 'center',
	},
});

export default ClubLogScreen;