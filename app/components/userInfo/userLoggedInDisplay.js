import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { LogInGoogleUser } from '../../utilities/firebase';
import { GetData, RemoveKey } from '../../utilities/asyncStorage';
import { CapitalizeWords } from '../../utilities/strings';
import { SetDefault } from '../../utilities/suggestedClub';


WebBrowser.maybeCompleteAuthSession();

const UserLoggedInDisplay = ({ currentUser, setCurrentUser }) => {
    const logOutOnPress =  () => {
        RemoveKey("user")
        RemoveKey("firebase:authUser:AIzaSyBvRzRFkfsJFWrwO7oa1yTTwUVkvxhYjAw:[DEFAULT]")
        SetDefault()
        setCurrentUser(null)
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.userImage}
                source={{
                    uri: currentUser.photoURL
                }}
            />
            <Text> Currently Logged In As {CapitalizeWords(currentUser.displayName)}</Text>
            <TouchableOpacity
                style={styles.logoutTouchable}
                onPress={logOutOnPress}
            >
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImage: {
        width: 100,
        height: 100
    },
    logoutTouchable: {
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue"
    }
});

export default UserLoggedInDisplay;