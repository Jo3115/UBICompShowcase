import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { LogInGoogleUser } from '../../utilities/firebase';
import { GetData } from '../../utilities/asyncStorage';


WebBrowser.maybeCompleteAuthSession();

const UserNotLoggedInDisplay = ({setCurrentUser}) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '643860382302-r72jqqrbj8fofkfkq7ro30p1isufh2lv.apps.googleusercontent.com',
    });

    const LogInUser = async () => {
        LogInGoogleUser(response, setCurrentUser)
    } 

    useEffect(() => {
        LogInUser()
    }, [response])

    return (
        <View style={styles.container}>
            <Text>Not currently Logged In, Log in to use personalised distances</Text>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UserNotLoggedInDisplay;