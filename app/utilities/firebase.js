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

export async function RemoveClub(userId, clubName) {
    const db = getDatabase();
    const reference = ref(db, `users/${userId}/distances/${clubName}`);
    await remove(reference);
}

export async function AddClub(userId, clubName, distance) {
    const db = getDatabase();
    const reference = ref(db, `users/${userId}/distances/${clubName}`);
    await set(reference, [distance]);
}
