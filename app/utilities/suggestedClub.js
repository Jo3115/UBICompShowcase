/**
 * @fileoverview this file contains functions used to calculate sugest clubs for the user
 */
import { GetData, StoreJsonData } from "./asyncStorage";

/**
 * CalculateClubBounds, function to calculate club bounds (average distance hit)
 * @param {object} clubDistanceinfo - object containg club information in the format {"club-name": [distances]}
 * @returns {object} - object containg average club information in the format {"distance": "club-name"}
 */
export function CalculateClubBounds(clubDistanceinfo) {
    let averages = {}
    for (club in clubDistanceinfo) {
        let averagedDistances = calculateAverageFromArray(clubDistanceinfo[club])
        averages[averagedDistances] = club
    }
    return averages
}

/**
 * calculateAverageFromArray, helper function to calculate average from a given array
 * @param {Array} arrayIn - array containg ints
 * @returns {number} - average of array
 */
function calculateAverageFromArray(arrayIn) {
    return arrayIn.reduce((a, b) => (a + b)) / arrayIn.length;
}

/**
 * CalculateClosestClub, function to calculate which clubs distance is closest to the target distance
 * @param {object} clubDistanceinfo - object containg club information in the format {"club-name": [distances]}
 * @returns {object} - object containg average club information in the format {"distance": "club-name"}
 */
export function CalculateClosestClub(clubs, targetDistance) {
    let clubsNo = Object.keys(clubs)
    return clubsNo.reduce(function (prev, curr) {
        return (Math.abs(curr - targetDistance) < Math.abs(prev - targetDistance) ? curr : prev);
    });
}

/**
 * GetUserDistances, function to get sorted user distances from local storage
 * @param {object} setClubData - set useState to hold the got club data
 * @param {object} setLoading - set useState to say function is complete
 */
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

/**
 * GetDefaultDistances, function to get sorted default distances from local storage
 * @param {object} setClubData - set useState to hold the got club data
 * @param {object} setLoading - set useState to say function is complete
 */
export async function GetDefaultDistances(setClubData, setLoading) {
    try {
        let clubData = JSON.parse(await GetData("default-club-data"))
        setClubData(CalculateClubBounds(clubData))
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

/**
 * SetDefault, function to overide the current user data with default data
 */
export async function SetDefault() {
    try {
        let clubData = JSON.parse(await GetData("default-club-data"))
        await StoreJsonData("club-data", clubData)
    } catch (error) {
        console.error(error)
    }
}