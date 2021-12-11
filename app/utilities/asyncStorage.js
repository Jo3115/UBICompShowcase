import AsyncStorage from '@react-native-async-storage/async-storage';

export async function StoreData(key, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`course-${key}`, jsonValue)
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