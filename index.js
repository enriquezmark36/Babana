/** @format */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {name as appName} from './app.json';

import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer';
import LoadingScreen from './app/components/LoadingScreen';

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

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
