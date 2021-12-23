import { getDistance, getRhumbLineBearing } from 'geolib';

export function CalculateDistance(start, end, metric) {
    let distance = getDistance(start, end, 0.1)
    distance = Math.round(convertDistance(distance, metric))
    return distance
}

export function CalculateDirection(start, end) {
    return Math.round(getRhumbLineBearing(start, end))
}

// all mesurements are in M convert to approprate metric
function convertDistance(distance, metric) {
    if (metric == "ft") {
        distance = distance * 3.28084
    } else if (metric == "yd") {
        distance = distance * 1.09361
    }
    return distance
}

// all mesurements are in M convert to approprate metric
export function ConvertRoundedDistance(distance, metric) {
    if (metric == "ft") {
        distance = distance * 3.28084
    } else if (metric == "yd") {
        distance = distance * 1.09361
    }
    return Math.round(distance)
}

// all mesurements are in M convert to approprate metric
export function ConvertRoundedDistanceToM(distance, metric) {
    if (metric == "ft") {
        distance = distance / 3.28084
    } else if (metric == "yd") {
        distance = distance / 1.09361
    }
    return Math.round(distance)
}