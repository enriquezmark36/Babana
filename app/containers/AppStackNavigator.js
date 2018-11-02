import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { TouchableRipple, Drawer } from 'react-native-paper';
import Home from '../containers/Home';
const { Component } = React;


const AppScreenStack = StackNavigator({
    Home: { screen: Home },
    Details: { screen: DetailsScreen }
  },{
    initialRouteName: 'List',
  });

// create a wrapper component for stack navigator
// and pass params and rootNavigation via screenProps
// (solution!!!)
class DocumentsStackNav extends Component {
 render() {
  const { navigation } = this.props;
  return <DocumentStack
	   screenProps={{
	        params: navigation.state.params,
	        rootNavigation: navigation
	  }}/>
}
