/** @format */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
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

import getTheme from './native-base-theme/components';
import banana from './native-base-theme/variables/material';
import { StyleProvider } from 'native-base';

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

export default function Main() {
  return (
    <StoreProvider store={store}>
      <StyleProvider style={getTheme(banana)}>
        <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </StyleProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
