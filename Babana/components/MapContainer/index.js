import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

import styles from "./MapContainerStyles.js";

const{width, height} = Dimensions.get('window');

const SCREEN_HEGIHT = height;
const SCREEN_WIDTH = width;
const APECT_RATIO = width/height;
const LATITUDE_DELTA = 0.022;
const LONGITUDE_DELTA = LATITUDE_DELTA*APECT_RATIO;

export default class Map extends Component{
    constructor(props){
        super(props)

        this.state ={
            intialPosition:{
                latitude: 14.599512,
                longitude: 120.984222,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            markerPosition:{
                latitude: 14.599512,
                longitude: 120.984222,
            }
        }
    }


    watchID: ?number = null

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);

            const initialRegion={
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }


            this.setState({initialPosition: initialRegion});
            this.setState({markerPosition: initialRegion});

            },
            (error)=>alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

        this.watchID = navigator.geolocation.watchPosition((position) => {
                var lat = parseFloat(position.coords.latitude);
                var long = parseFloat(position.coords.longitude);

                const lastRegion={
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }

                this.setState({initialPosition: lastRegion});
                this.setState({markerPosition: lastRegion});
                alert(this.state.initialPosition.latitude);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10, useSignificantChanges: true})
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return(
            <View style={styles.container}>
                <MapView
                    provider={MapView.PROVIDER_GOOGLE}//Tells mapview what kind of map
                    style = {styles.map}
                    region = {this.state.intialPosition}
                >
                <MapView.Marker coordinate = {this.state.markerPosition}></MapView.Marker>
                </MapView>
            </View>
        )
    }
}

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
