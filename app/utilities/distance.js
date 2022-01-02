/**
 * @fileoverview this file contains functions to calcualte distances between points as well as unit conversion.
 */
import { getDistance, getRhumbLineBearing } from 'geolib';

/**
 * CalculateDistance, function calculates the distance between two points and converts result to given metric
 * @param {object} start - object containg lat, lon for start point
 * @param {object} end - object containg lat, lon for end point
 * @param {string} metric - the metric to convert into default m
 * @returns {number} - calcualated distance
 */
export function CalculateDistance(start, end, metric) {
    let distance = getDistance(start, end, 0.1)
    distance = Math.round(convertDistance(distance, metric))
    return distance
}

/**
 * CalculateDirection, function calculates the direction between two points
 * @param {object} start - object containg lat, lon for start point
 * @param {object} end - object containg lat, lon for end point
 * @returns {number} - bearing between start point and end point
 */
export function CalculateDirection(start, end) {
    return Math.round(getRhumbLineBearing(start, end))
}

/**
 * convertDistance, function converts inputed number to approprate metric.
 * All mesurements are defaulted to m
 * @param {number} distance - number to convert
 * @param {string} metric - metric to conver to
 * @returns {number} - converted distance
 */
function convertDistance(distance, metric) {
    if (metric == "ft") {
        distance = distance * 3.28084
    } else if (metric == "yd") {
        distance = distance * 1.09361
    }
    return distance
}

/**
 * ConvertRoundedDistance, function converts inputed number to approprate metric rounded to 0dp.
 * All mesurements are defaulted to m
 * @param {number} distance - number to convert
 * @param {string} metric - metric to conver to
 * @returns {number} - converted distance
 */
export function ConvertRoundedDistance(distance, metric) {
    if (metric == "ft") {
        distance = distance * 3.28084
    } else if (metric == "yd") {
        distance = distance * 1.09361
    }
    return Math.round(distance)
}

/**
 * ConvertRoundedDistanceToM, function converts inputed number to m inverse of convertDistance
 * All mesurements are stored as m so conver other metrics to m for storage
 * @param {number} distance - number to convert
 * @param {string} metric - metric to conver from
 * @returns {number} - converted distance
 */
export function ConvertRoundedDistanceToM(distance, metric) {
    if (metric == "ft") {
        distance = distance / 3.28084
    } else if (metric == "yd") {
        distance = distance / 1.09361
    }
    return Math.round(distance)
}