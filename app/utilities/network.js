/**
 * @fileoverview this file contains functions check the networking capibilites of the users device
 */

import * as Network from 'expo-network';

export async function IsConnectedToInternet(){
    return await (await Network.getNetworkStateAsync()).isInternetReachable;
    
}