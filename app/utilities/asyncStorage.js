/**
 * @fileoverview this file contains wrapper function for constantly used AsyncStorage function
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * StoreCourse, function stores the object passed with the tag "course-{string}"
 * @param {string} courseName - the string to append to "course-" used as the key to store the data
 * @param {object} value - the course information as a Json obhject
 */
export async function StoreCourse(courseName, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`course-${courseName}`, jsonValue)
    } catch (e) {
        console.error(e);
    }
}

/**
 * StoreJsonData, general function to store a json object with a give key.
 * @param {string} key - the key to store the data to 
 * @param {object} value - the course information as a Json obhject
 */
export async function StoreJsonData(key, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.error(e);
    }
}

/**
 * GetAllKeys, function to retrieve all the currently stored keys to check which courses are downloaded.
 * @param {object} setKeys - useState to hold the returned keys
 * @param {object} setLoading - useState to say function is complete
 */
export async function GetAllKeys(setKeys, setLoading) {
    try {
        let value = await AsyncStorage.getAllKeys();
        setKeys(value)
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
}

/**
 * ReturnGetAllKeys, function to return all keys instead of updating useStates
 * @returns {Array} - list of keys currently in async storage
 */
export async function ReturnGetAllKeys() {
    return await AsyncStorage.getAllKeys();
}

/**
 * CheckKey, predicate function to check if a key is pressent
 * @param {string} key - key to check for
 * @returns {boolean} - if the key is pressent
 */
export async function CheckKey(key) {
    try {
        let value = await AsyncStorage.getItem(key);
        if (value != null) {
            return false
        } else {
            return true
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * GetData, function to get data stored with given key
 * @param {string} key - key to get data for
 * @returns {string} - stringified object corrisponding to given key
 */
export async function GetData(key) {
    return AsyncStorage.getItem(key)
}

/**
 * GetData, function to remove a key from storage removing associated data
 * @param {string} key - key to remove
 */
export async function RemoveKey(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.error(e)
    }
}