import React, { Component } from 'react';
import { Image, View, StatusBar } from 'react-native';

export default class LoadingScreen extends Component {
  render(){
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6a1b9a',
      }}>
        <StatusBar backgroundColor="#38006b" translucent />
        <Image source={require('../../Resources/banana.png')} />
      </View>
    );
  }
}
