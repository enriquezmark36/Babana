import React, { Component } from 'react';
import { Image, View } from 'react-native';

export default class LoadingScreen extends Component {
  render(){
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#9c27b0',
        }}>
      <Image

        source={require('../../Resources/banana.png')}
      />
      </View>
    );
  }
}
