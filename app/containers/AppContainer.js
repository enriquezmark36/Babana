import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import { ActionCreators } from '../actions';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from './Home'
import ReactNative from 'react-native';
const {
  View,
  StatusBar,
} = ReactNative;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

class AppContainer extends Component {
  render () {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor="#c8b900"/>

        <Home {...this.props} />

      </View>
    );
  }
}

export default connect((state) => {
  return { }
}, mapDispatchToProps)(AppContainer);
