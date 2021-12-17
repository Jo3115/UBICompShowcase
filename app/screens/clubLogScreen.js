import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TopMenuBar from '../components/topMenu/topMenuBar';


const ClubLogScreen = (props) =>  {
  return (
    <View style={styles.container}>
      <Text>CLOG</Text>
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