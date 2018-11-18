import React, {Component} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';

import styles from "./MapContainerStyles.js";

export const Map = ({region}) =>{
    return(
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}//Tells mapview what kind of map
                style = {styles.map}
                region = {region}
            >
            </MapView>
        </View>
    )
}

export default Map;

// export default class Map extends Component{
//     render(){
//         return(
//             <View style={styles.container}>
//                 <MapView
//                     provider={MapView.PROVIDER_GOOGLE}//Tells mapview what kind of map
//                     style = {styles.map}
//                     region = {{
//                         latitude: 14.599512,
//                         longitude: 120.984222,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421
//                     }}
//                 >
//                 </MapView>
//             </View>
//         )
//     }
// };
