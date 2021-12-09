import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { GetUserDistancesOnce, LogInGoogleUser } from '../utilities/firebase';

WebBrowser.maybeCompleteAuthSession();

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
            const response = await fetch('https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse?name=gerrardscross');
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

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '643860382302-r72jqqrbj8fofkfkq7ro30p1isufh2lv.apps.googleusercontent.com',
    });

    console.log(GetUserDistancesOnce("default"))

    useEffect(() => {
        LogInGoogleUser(response)
    }, [response]);

    return (
        <View style={styles.container}>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
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