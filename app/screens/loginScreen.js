import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBvRzRFkfsJFWrwO7oa1yTTwUVkvxhYjAw",
    authDomain: "ubicompshowcase.firebaseapp.com",
    projectId: "ubicompshowcase",
    storageBucket: "ubicompshowcase.appspot.com",
    messagingSenderId: "643860382302",
    appId: "1:643860382302:web:404dae693f68a8a2162acf",
    databaseURL: 'https://project-id.firebaseio.com',
};

initializeApp(firebaseConfig);

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

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            const auth = getAuth()
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential).then(
                (userCredential) => {
                    console.log(userCredential.user)
                }
            )
        }
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