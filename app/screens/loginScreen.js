import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { LogInGoogleUser } from '../utilities/firebase';
import { GetCourse } from '../utilities/courses';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);

    const loginOnPress = (item) => {
        navigation.push('DistanceScreen', {
            spotName: item.location
        })
    }

    useEffect(() => {
        GetCourse("gerrardscross", setLoading);
    }, []);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '643860382302-r72jqqrbj8fofkfkq7ro30p1isufh2lv.apps.googleusercontent.com',
    });

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