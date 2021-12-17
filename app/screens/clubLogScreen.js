import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TopMenuBar from '../components/topMenu/topMenuBar';
import { useEffect, useState } from 'react/cjs/react.development';
import UserNotLoggedInDisplay from '../components/userInfo/userNotLoggedInDisplay';


const ClubLogScreen = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState(null)

  const GetCurrentUser = async () => {
    setCurrentUser(JSON.parse(await GetData("user")))
  }

  useEffect(() => {
    GetCurrentUser()
  }, [])

  console.log(currentUser)

  return (
    <View style={styles.container}>
      <TopMenuBar navigation={navigation} title={"Club Data"} settingsButton={true} />
      {(currentUser == null) && <UserNotLoggedInDisplay setCurrentUser={setCurrentUser} />}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default ClubLogScreen;