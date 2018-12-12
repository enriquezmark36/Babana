import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as NativeBase from 'native-base';

import App from '../components/App'
import AlarmNotify from '../components/AlarmNotify'
import ContactPicker from '../components/AlarmNotify/ContactPicker'
import AlarmScreen from '../components/AlarmScreen';
import MapContainer from '../components/MapContainer';
import About from '../components/About';

const {
  Header,
  Body,
  Left,
  Button,
  Icon,
  Title,
  Right,
} = NativeBase;

// Define your additional Screens/Pages here
// You may write it something like this:
// const AppScreens = {
//   About: About,
//   Settings: Settings
// };
const AppScreens = {
  About: About,
  AlarmNotify: AlarmNotify,
  ContactPicker: ContactPicker,
  AlarmScreen: AlarmScreen,
  MapContainer: MapContainer,
};

const routes = Object.keys(AppScreens)
  .map(id => ({ id, item: AppScreens[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item;
    const Screen = (props => <Comp {...props} />);

    if (typeof Comp.navigationOptions === 'undefined')
      Screen.navigationOptions = (props) => ({
        header: null,
      });
    else
      Screen.navigationOptions = Comp.navigationOptions;

    return {
      ...acc,
      [id]: { screen: Screen },
    };
  }, {});


// Just for the picky, removes header by default
// if navigationOptions is undefined
function disableHeaderIfUndef(Comp) {
  if (typeof Comp.navigationOptions === 'undefined')
    Comp.navigationOptions = (props) => ({
      header: null
    });
  return Comp;
}

const AppStack = createStackNavigator(
  {
    Home: { screen: disableHeaderIfUndef(App)},
    ...routes,
  },
  {
    navigationOptions: ({ navigation }) => {
      let drawerLockMode = 'unlocked';
      if (navigation.state.index > 0) {
        drawerLockMode = 'locked-closed';
      }

      return {
        drawerLockMode,
      };
    }
  }
)

export default AppStack;
