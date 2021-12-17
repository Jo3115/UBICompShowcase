import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { CalculateClubBounds } from './suggestedClub';
import { StoreJsonData } from './asyncStorage';

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

export async function GetUserDistances(userId, setData, setLoading) {
    try {
        let url = `https://ubicompshowcase-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/distances.json`
        const response = await fetch(url)
        const json = await response.json()
        const filteredDistances = CalculateClubBounds(json)
        setData(filteredDistances)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}
