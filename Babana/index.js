/** @format */

import React from 'react';

import {AppRegistry} from 'react-native';
import AppStack from './components/AppStack';
import {name as appName} from './app.json';

//native-base theme
import getTheme from './native-base-theme/components';
import banana from './native-base-theme/variables/material';
import { StyleProvider } from 'native-base';


function Main() {
  return (
    <StyleProvider style={getTheme(banana)}>
      <AppStack />
    </StyleProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
