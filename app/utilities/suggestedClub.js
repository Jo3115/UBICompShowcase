import { GetData, StoreJsonData } from "./asyncStorage";

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

export async function GetUserDistances(setClubData, setLoading) {
    try {
        let clubData = JSON.parse(await GetData("club-data"))
        setClubData(CalculateClubBounds(clubData))
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

export async function SetDefault() {
    try {
        let clubData = JSON.parse(await GetData("default-club-data"))
        await StoreJsonData("club-data", clubData)
    } catch (error) {
        console.error(error)
    }
}