import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeDrawer } from '../components/HomeDrawer';

export const AppStack = createStackNavigator(
  {
    Home: { screen: HomeDrawer}
  },
  {
    headerMode: 'none',
    transparentCard: true
  }
);
