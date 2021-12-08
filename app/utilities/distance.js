import { getDistance } from 'geolib';

export function CalculateDistance(start, end, metric){
    let distance = getDistance(start, end, 0.1)
    console.log(distance)
    if (metric == "ft") {
        distance = distance * 3.28084
    } else if (metric == "yd") {
        distance = distance * 1.09361
    }
    distance = Math.round(distance)
    console.log(distance)
    return distance
}