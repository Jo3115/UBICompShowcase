import { GetUserDistancesOnce } from "./firebase";

export function CalculateClubBounds(user) {
    let distancesIn = GetUserDistancesOnce(user)
    console.log(distancesIn)
    let averages = []
    for (club in distancesIn){
        let averagedDistances = calculateAverageFromArray(distancesIn[club])
        console.log({averagedDistances: club})
        averages.push({averagedDistances: club})
    }
    console.log(averages)
}

function calculateAverageFromArray(arrayIn) {
    return arrayIn.reduce((a, b) => (a + b)) / arrayIn.length;
}

async function storeClubBounds(value){
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@current_course', jsonValue)
    } catch (e) {
        console.error(e);
    }
}