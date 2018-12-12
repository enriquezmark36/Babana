/** @format */

import React from 'react';

import {AppRegistry} from 'react-native';
import AppDrawer from './components/AppDrawer';
import {name as appName} from './app.json';

//native-base theme
import getTheme from './native-base-theme/components';
import banana from './native-base-theme/variables/material';
import { StyleProvider } from 'native-base';


function Main() {
  return (
    <StyleProvider style={getTheme(banana)}>
      <AppDrawer />
    </StyleProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
