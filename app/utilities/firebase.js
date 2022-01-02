/**
 * @fileoverview this file contains functions to communicate with firebase
 */
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { StoreJsonData } from './asyncStorage';
import { getDatabase, ref, remove, set } from "firebase/database";



// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBvRzRFkfsJFWrwO7oa1yTTwUVkvxhYjAw",
    authDomain: "ubicompshowcase.firebaseapp.com",
    projectId: "ubicompshowcase",
    storageBucket: "ubicompshowcase.appspot.com",
    messagingSenderId: "643860382302",
    appId: "1:643860382302:web:404dae693f68a8a2162acf",
    databaseURL: 'https://ubicompshowcase-default-rtdb.europe-west1.firebasedatabase.app/',
};

initializeApp(firebaseConfig);

/**
 * LogInGoogleUser, function to log in a user using firbase auth when provided with a google auth token
 * @param {object} response - google login response object containg auth
 * @param {object} setCurrentUser - set useState to hold the returned user information
 */
export async function LogInGoogleUser(response, setCurrentUser) {
    if (response?.type === 'success') {
        const { id_token } = response.params
        const auth = getAuth()
        const credential = GoogleAuthProvider.credential(id_token)
        signInWithCredential(auth, credential).then(
            (userCredential) => {
                formattedUser = {
                    "displayName": userCredential.user.displayName,
                    "email": userCredential.user.email,
                    "photoURL": userCredential.user.photoURL,
                    "uid": userCredential.user.uid
                }
                StoreJsonData("user", formattedUser)
                setCurrentUser(formattedUser)
            }
        )
    }
}

/**
 * SaveUserDistances, function to save user disctances localy from firbase
 * @param {string} userId - id of current user
 */
export async function SaveUserDistances(userId) {
    try {
        let url = `https://ubicompshowcase-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/distances.json`
        const response = await fetch(url)
        const json = await response.json()
        await StoreJsonData("club-data", json)
    } catch (error) {
        console.error(error)
    }
}

/**
 * SaveDefaultDistances, function to save default disctances localy from firbase
 */
export async function SaveDefaultDistances() {
    try {
        let url = `https://ubicompshowcase-default-rtdb.europe-west1.firebasedatabase.app/users/default/distances.json`
        const response = await fetch(url)
        const json = await response.json()
        await StoreJsonData("default-club-data", json)
    } catch (error) {
        console.error(error)
    }
}

/**
 * SaveUserDistances, function to remove club from users clubs stored in firebase
 * @param {string} userId - id of current user
 * @param {string} clubName - club to remove
 */
export async function RemoveClub(userId, clubName) {
    const db = getDatabase();
    const reference = ref(db, `users/${userId}/distances/${clubName}`);
    await remove(reference);
}

/**
 * AddClub, function to add a club to users clubs stored in firebase
 * @param {string} userId - id of current user
 * @param {string} clubName - club to add
 * @param {string} distance - distance to assign to club
 */
export async function AddClub(userId, clubName, distance) {
    const db = getDatabase();
    const reference = ref(db, `users/${userId}/distances/${clubName}`);
    await set(reference, [distance]);
}
