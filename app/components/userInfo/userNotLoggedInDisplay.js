/**
 * @fileoverview this file represents a UserNotLoggedInDisplay compoenent used to render a log in button and hand needed functions to log the user in
 */
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { LogInGoogleUser } from '../../utilities/firebase';


WebBrowser.maybeCompleteAuthSession();

/**
 * UserNotLoggedInDisplay, renders a log in button and hand needed functions to log the user in
 * @param {Function} setCurrentUser - function to set currentUser value
 */
const UserNotLoggedInDisplay = ({ setCurrentUser }) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '643860382302-r72jqqrbj8fofkfkq7ro30p1isufh2lv.apps.googleusercontent.com',
    });
    /**
     * LogInUser, Function, logs in a user using a google user token
     */
    const LogInUser = async () => {
        LogInGoogleUser(response, setCurrentUser)
    }

    useEffect(() => {
        LogInUser()
    }, [response])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign in to personalise distances</Text>
            <TouchableOpacity
                onPress={() => {
                    promptAsync();
                }}
            >
                <Image
                style={styles.logInImage}
                source={{uri: 'https://cdn.discordapp.com/attachments/892432524704354364/921362863711469578/VHSZf.png'}}
            />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#694fad',
        borderWidth: 2,
        marginVertical: 10
    },
    text: {
        paddingBottom: 20,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    logInImage:{
        width: 250,
        height: 59
    }
});

export default UserNotLoggedInDisplay;