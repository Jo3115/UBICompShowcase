/**
 * @fileoverview this file represents a UserLoggedInDisplay compoenent used to render user information and a log out button
 */
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { RemoveKey } from '../../utilities/asyncStorage';
import { CapitalizeWords } from '../../utilities/strings';
import { SetDefault } from '../../utilities/suggestedClub';


WebBrowser.maybeCompleteAuthSession();

/**
 * UserLoggedInDisplay, renders user information and a log out button
 * @param {object} currentUser - object containg current user information
 * @param {Function} setCurrentUser - function to set currentUser value
 */
const UserLoggedInDisplay = ({ currentUser, setCurrentUser }) => {
    /**
     * logOutOnPress, Function, logs out the current user on press
     */
    const logOutOnPress = () => {
        RemoveKey('user')
        RemoveKey('firebase:authUser:AIzaSyBvRzRFkfsJFWrwO7oa1yTTwUVkvxhYjAw:[DEFAULT]')
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
            <View style={styles.textContainer}>
                <Text style={styles.text}>Currently Logged In As:</Text>
                <Text style={styles.text}>{CapitalizeWords(currentUser.displayName)}</Text>
            </View>
            <TouchableOpacity
                style={styles.logoutTouchable}
                onPress={logOutOnPress}
            >
                <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    userImage: {
        width: 110,
        height: 110,
        borderRadius: 100
    },
    logoutTouchable: {
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#f4f3f4',
        borderColor: "#a696ce",
        borderWidth: 2,
        borderRadius: 20
    },
    text: {
        fontSize: 16
    },
    textContainer :{
        paddingVertical: 10,
        alignItems:"center"
    }
});

export default UserLoggedInDisplay;