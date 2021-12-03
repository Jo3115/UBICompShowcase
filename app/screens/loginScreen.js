import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as GoogleSignIn from 'expo-google-sign-in';



const LoginScreen = ({ navigation }) => {
    const loginOnPress = (item) => {
        navigation.push('MainScreen', {
            spotName: item.location
        })
    }
    return (
        <View style={styles.container}>
            <Button
                onPress={loginOnPress}
                title="Log In"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen;