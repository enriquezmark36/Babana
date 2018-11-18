import React, { Component } from 'react';
import AppStack from '../components/AppStack'
import ReactNative from 'react-native';
import HomeDrawer from '../components/HomeDrawer'
const {
  View,
  StatusBar,
} = ReactNative;

export default class AppContainer extends Component {
  render () {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor="#c8b900" />
        <HomeDrawer/>
      </View>
    );
  }
}