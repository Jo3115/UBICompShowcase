import AsyncStorage from '@react-native-async-storage/async-storage';

export async function StoreData(key, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@current_course', jsonValue)
    } catch (e) {
        console.error(e);
    }
}