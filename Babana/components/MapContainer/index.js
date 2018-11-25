import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Container, Content, Button, Header, Footer, FooterTab, Left, Body, Right, Title, Card, CardItem} from 'native-base';

import MapView from 'react-native-maps';
import RNGGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';
import Icon from "react-native-vector-icons/MaterialIcons";

import AlarmScreen from '../AlarmScreen';

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
            timeLeft: 0,
            isMapReady: false,
            isAlarmOn: false,
            contactList: [],
            message: '',
            lastIndex: 0,
        }
    }

    watchID: ?number = null

    toggleAlarm(){
        let alarmState = !this.state.isAlarmOn;

        this.setState({
            isAlarmOn: alarmState
        })
    }

    activateAlarm(){
        if(this.state.isAlarmOn && this.state.timeLeft <= 15){
            this.setState({
                isAlarmOn: false
            });

            this.props.navigation.navigate("AlarmScreen");
        }
    }

    updateTimeandDistance(newDistance, newTime){
        this.setState({
            distance: newDistance
        });
        this.setState({
            timeLeft: newTime
        });
    }

    onMapLayout(){
        this.setState({
            isMapReady: true
        });
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
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
                this.setState({origin:{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }});
        },
        (error)=>alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 60000, maximumAge: 1000, distanceFilter: 10, useSignificantChanges: false})

        this.interval = setInterval(() => this.activateAlarm(),1000);
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
                }});
                this.setState({origin:{
                    latitude: results[0].latitude,
                    longitude: results[0].longitude
                }});
            })
            .catch((error) => console.log(error.message));
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID);
        clearInterval(this.interval);
    }

    //
    // For Alarm Notify Page
    //
    _showNotifyPage() {
      const {contactList, message, lastIndex} = this.state;

      const mapComponentToProps = this._mapComponentToProps.bind(this);
      this.props.navigation.navigate('AlarmNotify',
        {mapComponentToProps, contactList, message, lastIndex});
    }

    // Save the props from a Alarm Notify Page
    _mapComponentToProps(contactList, message, lastIndex){
      this.setState({contactList, message, lastIndex});
    }


    render() {
        if(this.state.isAlarmOn){
            alarmState = <Text>Deactivate alarm</Text>
        }else{
            alarmState = <Text>Activate alarm</Text>
        }

        // if(this.state.isAlarmOn && this.state.timeLeft <= 15){
        //     this.activateAlarm();
        // }

        return(
            <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={this.openSearchModal.bind(this)}><Icon name="search" size={30}/></Button>
                        </Left>
                        <Body>
                            <Title style= {{color: 'black'}}>Babana</Title>
                        </Body>
                        <Right>
                            <Button warning onPress={this.findMe.bind(this)}><Text>Find Me</Text></Button>
                        </Right>
                    </Header>
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
                        onLayout = {this.onMapLayout.bind(this)}
                    >
                    <MapView.Marker coordinate={this.state.markerPosition} />

                    <MapViewDirections
                        origin = {this.state.origin}
                        destination = {this.state.markerPosition}
                        apikey = {"AIzaSyB6-GKz6npAKsFVebEeoc16ALXzuYrSWpE"}
                        strokeWidth={3}
                        strokeColor="orange"

                        onReady={(result) => {
                            this.updateTimeandDistance(result.distance, result.duration);
                        }}
                    />

                    </MapView>


                    <View style={styles.footer}>
                    <Card>
                        <CardItem>
                            <Text>Time to Destination: {Math.ceil(this.state.timeLeft)} minutes</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem button onPress = {this.toggleAlarm.bind(this)}>
                            {alarmState}
                        </CardItem>

                    </Card>
                    <Card>
                      <CardItem button onPress={this._showNotifyPage.bind(this)}>
                        {(this.state.contactList.length !== 0) &&
                          (<Text>
                            Going to Notify {this.state.contactList.length} people
                          </Text>) ||
                          (<Text> Tap to configure SMS Functionality </Text>)}
                      </CardItem>
                    </Card>
                    </View>

            </Container>
        );
    }
}
