/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import MapView from 'react-native-maps';

import {Container, Title, Header, Body} from 'native-base';
import Map from "./components/MapContainer";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
      const region = {
          latitude: 14.599512,
          longitude: 120.984222,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
      }
      return (
         <Container>
            <Header>
                <Title>Babana!</Title>
            </Header>
            <Map region={region}/>
         </Container>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    position: 'absolute',
    top: 0,
    left:0,
    bottom:0,
    right:0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map:{
      position: 'absolute',
      top: 0,
      left:0,
      bottom:0,
      right:0
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
