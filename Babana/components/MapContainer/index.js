import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Container, Content, Button} from 'native-base';
import MapView from 'react-native-maps';

import styles from "./MapContainerStyles.js";

<<<<<<< HEAD
import SearchBox from "../SearchBox";

=======
>>>>>>> 190e0396a33377067ec48d91d757c190f8cc48de
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
            mapPosition:{
                latitude: 14.599512,
                longitude: 120.984222,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
        }
    }

    watchID: ?number = null

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            // const initialRegion={
            //     latitude: parseFloat(position.coords.latitude),
            //     longitude: parseFloat(position.coords.longitude),
            //     latitudeDelta: LATITUDE_DELTA,
            //     longitudeDelta: LONGITUDE_DELTA
            // }


            this.setState({mapPosition: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }});

            },
            (error)=>alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 60000, maximumAge: 1000})

        this.watchID = navigator.geolocation.watchPosition((position) => {

                // const lastRegion={
                //     latitude: parseFloat(position.coords.latitude),
                //     longitude: parseFloat(position.coords.longitude),
                //     latitudeDelta: LATITUDE_DELTA,
                //     longitudeDelta: LONGITUDE_DELTA
                // }

                this.setState({mapPosition: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }});
                //this.setState({markerPosition: lastRegion});
            },
            (error)=>alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 60000, maximumAge: 1000, distanceFilter: 10, useSignificantChanges: true})
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return(
<<<<<<< HEAD
            <Container>
=======
            <View style={styles.container}>
>>>>>>> 190e0396a33377067ec48d91d757c190f8cc48de
                <MapView
                    provider={MapView.PROVIDER_GOOGLE}//Tells mapview what kind of map
                    style = {styles.map}
                    region = {this.state.mapPosition}
                    showsUserLocation={true}
<<<<<<< HEAD
                    showsMyLocationBUtton={true}
=======
					showsMyLocationButton={true}
>>>>>>> 190e0396a33377067ec48d91d757c190f8cc48de
					showsCompass={true}
					followsUserLocation={true}
					loadingEnabled={true}
					toolbarEnabled={true}
					zoomEnabled={true}
					rotateEnabled={true}
                >

                </MapView>
<<<<<<< HEAD
                <SearchBox />
            </Container>
=======
            </View>
>>>>>>> 190e0396a33377067ec48d91d757c190f8cc48de
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
