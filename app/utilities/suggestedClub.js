export function CalculateClubBounds(clubDistanceinfo) {
    let averages = {}
    for (club in clubDistanceinfo) {
        let averagedDistances = calculateAverageFromArray(clubDistanceinfo[club])
        averages[averagedDistances] = club
    }
    return averages
}

function calculateAverageFromArray(arrayIn) {
    return arrayIn.reduce((a, b) => (a + b)) / arrayIn.length;
}

export function CalculateClosestClub(clubs, targetDistance) {
    let clubsNo = Object.keys(clubs)
    return clubsNo.reduce(function (prev, curr) {
        return (Math.abs(curr - targetDistance) < Math.abs(prev - targetDistance) ? curr : prev);
    });
}

async function storeClubBounds(value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@clubBounds', jsonValue)
    } catch (e) {
        console.error(e);
    }
}