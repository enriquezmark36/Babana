import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import AppStack from '../AppStack';
import SideBar from './SideBar';
import About from '../About';

const drawer =  createDrawerNavigator(
  {
    Home: { screen: AppStack },
    About: { screen: About }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);


export default createAppContainer(drawer);
