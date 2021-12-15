import * as Network from 'expo-network';

export async function IsConnectedToInternet(){
    return await (await Network.getNetworkStateAsync()).isInternetReachable;
    
}