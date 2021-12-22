import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { LogInGoogleUser } from '../../utilities/firebase';
import { GetData, ReturnGetAllKeys } from '../../utilities/asyncStorage';
import UserNotLoggedInDisplay from './userNotLoggedInDisplay';
import UserLoggedInDisplay from './userLoggedInDisplay';


WebBrowser.maybeCompleteAuthSession();

const UserInfoDisplay = () => {
    const [currentUser, setCurrentUser] = useState(null)

    const GetCurrentUser = async () => {
        setCurrentUser(JSON.parse(await GetData("user")))
    }

    useEffect(() => {
        GetCurrentUser()
    }, [])

    if (currentUser == null) {
        return <View></View>
    }

    return (
        <UserLoggedInDisplay currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UserInfoDisplay;