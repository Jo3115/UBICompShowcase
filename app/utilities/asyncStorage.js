import AsyncStorage from '@react-native-async-storage/async-storage';

export async function StoreCourse(courseName, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`course-${courseName}`, jsonValue)
    } catch (e) {
        console.error(e);
    }
}

export async function StoreJsonData(key, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.error(e);
    }
}

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

export async function ReturnGetAllKeys() {
    return await AsyncStorage.getAllKeys();
}

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

export async function GetData(key) {
    return AsyncStorage.getItem(key)
}

export async function RemoveKey(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.error(e)
    }
}