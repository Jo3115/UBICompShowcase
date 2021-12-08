import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as GoogleSignIn from 'expo-google-sign-in';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);

    const loginOnPress = (item) => {
        navigation.push('MainScreen', {
            spotName: item.location
        })
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@current_course', jsonValue)
        } catch (e) {
            console.error(e);
        }
    }

    const getCourse = async () => {
        try {
            const response = await fetch('https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse?name=unicource');
            const json = await response.json();
            storeData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCourse();
    }, []);

    return (
        <View style={styles.container}>
            {!isLoading &&
                <Button
                    onPress={loginOnPress}
                    title="Log In"
                />
            }
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