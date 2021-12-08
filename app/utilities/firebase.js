import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";

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

const database = getDatabase();

export function LogInGoogleUser(response) {
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
}

export function GetUserDistances(userId) {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userId}/distances`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}