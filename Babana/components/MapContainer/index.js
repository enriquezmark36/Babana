import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Container, Content, Button, CardItem} from 'native-base';

import MapView from 'react-native-maps';
import RNGGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';

import styles from "./MapContainerStyles.js";

import SearchResults from "../SearchResults";
import SearchBox from "../SearchBox";

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
            origin:{
                latitude: 14.599512,
                longitude: 120.984222
            },
            markerPosition:{
                latitude: 14.599512,
                longitude: 120.984222
            },
            distance: 0,
            timeLeft: 0
        }
    }

    watchID: ?number = null

    updateTimeandDistance(newDistance, newTime){
        this.setState({
            distance: newDistance
        });
        this.setState({
            timeLeft: newTime
        })
    }

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
            this.setState({markerPosition: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }});
            this.setState({origin:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
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

                this.setState({origin:{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }});
            },
            (error)=>alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 60000, maximumAge: 1000, distanceFilter: 10, useSignificantChanges: false})
        //RNGGooglePlaces.openPlacePickerModal()
        // .then((place)=>{this.setState({mapPosition:{
        //     latitude: results[0].latitude,
        //     longitude: results[0].longitude,
        //     latitudeDelta: LATITUDE_DELTA,
        //     longitudeDelta: LONGITUDE_DELTA
        // }})
        // this.setState({
        //     markerPosition:{
        //         latitude:results[0].latitude,
        //         longitude:results[0].longitude
        //     }
        // })
        // })
        // .catch(error=>console.log(error.message))
    }

    openSearchModal(){
        RNGGooglePlaces.openPlacePickerModal()
        .then((place)=>{this.setState({mapPosition:{
            latitude: place.latitude,
            longitude: place.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }})
        this.setState({
            markerPosition:{
                latitude:place.latitude,
                longitude:place.longitude
            }
        })
        })
        .catch(error=>console.log(error.message))
    }

    findMe(){
        RNGGooglePlaces.getCurrentPlace()
            .then((results)=>{
                this.setState({mapPosition:{
                latitude: results[0].latitude,
                longitude: results[0].longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
                }})
            })
            .catch((error) => console.log(error.message));
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {

        return(
            <Container>
                <MapView
                    provider={MapView.PROVIDER_GOOGLE}//Tells mapview what kind of map
                    style = {styles.map}
                    region = {this.state.mapPosition}
                    showsUserLocation={true}
					showsMyLocationButton={true}
					showsCompass={true}
					followsUserLocation={true}
					loadingEnabled={true}
					toolbarEnabled={true}
					zoomEnabled={true}
					rotateEnabled={true}
                >
                <MapView.Marker coordinate={this.state.markerPosition} />

                <MapViewDirections
                    origin = {this.state.origin}
                    destination = {this.state.markerPosition}
                    apikey = {'AIzaSyB6-GKz6npAKsFVebEeoc16ALXzuYrSWpE'}
                    strokeWidth={3}
                    strokeColor="orange"

                    onReady={(result) => {
                        this.updateTimeandDistance(result.distance, result.duration);
                    }}
                />

                </MapView>
                <Button light onPress={this.openSearchModal.bind(this)}><Text>Search</Text></Button>
                <Button warning onPress={this.findMe.bind(this)}><Text>Find Me</Text></Button>
                <CardItem><Text>Distance to Destination: {this.state.distance}</Text></CardItem>
                <CardItem><Text>Time to Destination: {this.state.timeLeft}</Text></CardItem>
            </Container>
        );
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
