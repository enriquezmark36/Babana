/** @format */

import React, { Component } from 'react';
import {AppRegistry, StatusBar, View, StyleSheet} from 'react-native';
import { TouchableRipple, Drawer, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {name as appName} from './app.json';

import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer';
import LoadingScreen from './app/components/LoadingScreen';

import {
  Text
} from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
/* Create logger that only activates in Dev mode */
const loggerMiddlerware = createLogger( { predicate: (getState, action) => __DEV__} );

const persistConfig = {
  key: 'root',
  storage: storage,
};

const pReducer = persistReducer(persistConfig, reducer);

function  configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddlerware
    ),
  );
  return createStore(pReducer, initialState, enhancer);
}

const store = configureStore({});
const persistor = persistStore(store);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'yellow',
    accent: 'purple',
  },
};

const ScreenStack = createDrawerNavigator(
  { Home: { screen: AppContainer } },
  {
    contentComponent: () => (
        <View style={{top: 28}} >
          <Drawer.Section title="Section Label">
            <TouchableRipple
              onPress={() => {}}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <Drawer.Item label="Settings?" />
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {}}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <Drawer.Item label="Leche Ayaw ko na" />
            </TouchableRipple>
          </Drawer.Section>
        </View>
    ),
  }
);

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
          <ScreenStack />
        </PersistGate>
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
