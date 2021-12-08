import { getDistance } from 'geolib';

export function CalculateDistance(start, end, startHeight, endHeight){
    let flatDistance = getDistance(start, end, 0.1)
    let heightChange = Math.abs(startHeight-endHeight)
    let actualDistance = Math.hypot(flatDistance, heightChange)
    return flatDistance
}